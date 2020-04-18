'use strict';

const { Octokit } = require('@octokit/rest');

const taskName = 'publish_github_drafts';
const taskDescription = 'Create a release on GitHub';

let githubClient = {};

module.exports = (grunt) => {
	grunt.registerTask(taskName, taskDescription, async function() {
		const done = this.async();
		const { owner, repo, token, tag } = grunt.config.get(this.name);

		githubClient = new Octokit({ auth: token });

		try {
			await publishRelease(owner, repo, tag);
			grunt.log.ok(`Created release for ${tag} version`);
		} catch (err) {
			grunt.fail.fatal(err);
		} finally {
			done();
		}
	});
};

/**
 * Publish a release on GitHub.
 * Find a previously created draft release and make it as published one.
 *
 * @param  {String} owner Repository owner
 * @param  {String} repo Repository name
 * @param  {String} tag Git tag
 */
async function publishRelease(owner, repo, tag) {
	const release = await getReleaseByName(owner, repo, tag);
	if (!release.draft) {
		throw new Error(`Unable to create release: ${tag} is not a draft release`);
	}

	await githubClient.repos.updateRelease({
		owner, repo,

		draft: false,
		tag_name: tag,
		release_id: release.id,
	});
}

/**
 * Get release by git tag.
 *
 * @param  {String} owner Repository owner
 * @param  {String} repo Repository name
 * @param  {String} tag Git tag
 * @return {Promise} Promise resolved with release object
 */
async function getReleaseByName(owner, repo, tag) {
	const response = await githubClient.repos.listReleases({ owner, repo });
	if (!response) {
		throw new Error(`${owner}/${repo} has no releases`);
	}

	const releases = response.data;
	for (const release of releases) {
		// Drafts have no `tag` property
		if (release.name === tag) {
			return release;
		}
	}

	throw new Error(`${owner}/${repo} has no ${tag} release`);
}

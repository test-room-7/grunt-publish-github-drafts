# grunt-publish-github-drafts [![NPM][NpmBadge]][Npm] [![Test][WorkflowBadge]][Workflow]

A Grunt task to publish release drafts on GitHub.

This task searches for a release draft with a given tag name.
If the draft is found, the task attaches the tag (if it exists)
to this release, then publishes the release.

## Usage

You can install `grunt-publish-github-drafts` by a following way:
```sh
> npm install --save-dev grunt-publish-github-drafts
```

Then you can add a configuration section for
`publish_github_drafts` task in your `Gruntfile.js`:

```js
// If you don't use a `load-grunt-tasks` module,
// you should load `grunt-publish-github-drafts` directly.
grunt.loadNpmTasks('grunt-publish-github-drafts');

grunt.initConfig({
	publish_github_drafts: {
		owner: 'username/organization',
		repo: 'repository name',
		token: 'GitHub token',
		tag: 'Tag to search',
	}
});
```

## Workflow

1. Create a new draft reserved for a new version,
and name it in a semver format, e.g. `v0.1.0`.
2. Update a description of the draft during development, if neccessary.
3. When a new version is ready, push the tag to repository (`v0.1.0` in this case).
4. Then run this task, and it will apply the `v0.1.0`
tag to the draft, and will publish it.

## License

Licensed under the [MIT License](./LICENSE).

<!-- Badges -->
[NpmBadge]: https://img.shields.io/npm/v/grunt-publish-github-drafts
[WorkflowBadge]: https://github.com/web-scrobbler/grunt-publish-github-drafts/workflows/Lint/badge.svg

<!-- Related pages -->
[Npm]: https://www.npmjs.com/package/grunt-publish-github-drafts
[Workflow]: https://github.com/web-scrobbler/grunt-publish-github-drafts/actions?query=workflow%3ALint

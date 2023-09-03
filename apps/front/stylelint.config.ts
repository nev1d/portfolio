module.exports = {
    extends: ['stylelint-config-idiomatic-order'],
    plugins: ['stylelint-declaration-block-no-ignored-properties', 'stylelint-order'],
    rules: {
        'plugin/declaration-block-no-ignored-properties': true,
        'selector-pseudo-class-no-unknown': null,
        'stylelint-core-vars/use-one-of-mixins': null,
        'value-list-comma-newline-after': null,
        'declaration-block-trailing-semicolon': null,
        'declaration-colon-newline-after': null,
    },
};

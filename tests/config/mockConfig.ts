export const mockConfig =
`
name: 'mockConfig'
rules:
  - test: !regexp /foo/gi
    parser: 'mockParser'
    handler: 'mockHandler'
`;

export const invalidMockConfig =
`
name: 'mockConfig'
rules:
  - test: 5
    parser: 'mockParser'
    handler: 'mockHandler'
`;

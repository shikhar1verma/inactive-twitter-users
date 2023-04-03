# How to extract rest id

NOTE: This only works in desktop.

1. First go to your following list page.
2. Then open developers tool by (CTRL + SHIFT + I) or (F12).
3. Open network tab their.
4. Refresh the page. We need to preview the data of API named:
`https://twitter.com/i/api/graphql/FaBzCqZXuQCb4PhB0RHqHw/Following`

5. Then in `data > user > restul > timeline > timeline > instructions`. Open instructions with entries.
6. Here each entryId `user-1452490477119311874` having rest id.
7. Rest id is id after `user-` so '1452490477119311874'.
8. This needs to put in following list.
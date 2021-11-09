# Pagination-UI-LESS

## How to use

1. use npm or yarn to install

    ```shell
    npm i pagination-ui-less
    ```

    or

    ```shell
    yarn add pagination-ui-less
    ```

2. use CDN include

    ```html
    <script src="https://cdn.jsdelivr.net/npm/pagination-ui-less"></script>
    ```

    then you can use the following example to create a Pagination manager:

    ```js
    const pagination = paginationUiLess({
        pagesLength: 1,
        currentPage: 1,
        onChange: () => {}
    })
    ```

## types

```ts
export declare type TCreatePaginationProps = {
    pagesLength: number;
    onChange: (pages: TPages) => void;
    currentPage?: number;
};
```

```ts
export declare type TPages = {
    currentPage: number;
    pages: {
        action: string | null;
        value: number | string;
        isActive?: boolean;
    }[];
};
```

## Methods

1. setPage

    `(n: number) => TPages;`

1. setPagesLength

    `(newPagesLength: number, newCurrentPage: number) => TPages`

1. getPages

    `() => TPages`

1. getCurrentPage

    `() => number`

1. nextPage

    `() => TPages`

1. previousPage

    `() => TPages`

1. firstPage

    `() => TPages`

1. lastPage

    `() => TPages`

## Example

https://github.com/SidStraw/Pagination-UI-LESS/blob/main/example/main.js

```js
import { createPaginationItem } from './module/createElements.js'

async function main() {
  const paginationElement = document.querySelector('#pagination')

  // declare type TCreatePaginationProps = {
  //   pagesLength: number;
  //   onChange: (pages: TPages) => void;
  //   currentPage?: number;
  // };
  const pagination = paginationUiLess({
    pagesLength: 10,
    onChange: updateElements,
  })

  function updateElements({ currentPage, pages }) {
    // declare type TPages = {
    //   currentPage: number;
    //   pages: {
    //      action: string | null;
    //      value: number | string;
    //      isActive?: boolean;
    //   }[];
    // };
    paginationElement.innerHTML = pages.map(createPaginationItem).join('')
  }

  paginationElement.addEventListener('click', e => {
    const { action, value } = e.target.dataset
    const newPage = Number(value)
    const currentPage = pagination.getCurrentPage()

    if (!action || currentPage === newPage) return

    pagination[action](newPage)
  })

  updateElements(1)
}

main()
```

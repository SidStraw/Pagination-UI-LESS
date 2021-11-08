import { createCard, createPaginationItem } from './module/createElements.js'

async function main() {
  const PAGE_ITEM_QUANTITY = 10

  const { CarParks } = await fetch('/example/mockData.json').then(res => res.json())

  const infoElement = document.querySelector('#info')
  const paginationElement = document.querySelector('#pagination')

  const pagesLength =
    CarParks.length % PAGE_ITEM_QUANTITY === 0
      ? CarParks.length / PAGE_ITEM_QUANTITY
      : Math.trunc(CarParks.length / PAGE_ITEM_QUANTITY) + 1

  const pagination = paginationUiLess({
    pagesLength,
    onChange: updateElements,
  })

  function updateElements({ currentPage, pages }) {
    const currentIndex = (currentPage - 1) * PAGE_ITEM_QUANTITY
    const currentDara = CarParks.slice(currentIndex, currentIndex + PAGE_ITEM_QUANTITY)

    infoElement.innerHTML = currentDara.map(createCard).join('')
    paginationElement.innerHTML = pages.map(createPaginationItem).join('')
  }

  paginationElement.addEventListener('click', e => {
    const { action, value } = e.target.dataset
    const newPage = Number(value)
    const currentPage = pagination.getCurrentPage()

    if (!action || currentPage === newPage) return

    pagination[action](newPage)
  })

  const url = new URL(window.location.href)
  const pageParams = url.searchParams.get('page') || 1
  updateElements(pagination.setPage(pageParams))
}

main()

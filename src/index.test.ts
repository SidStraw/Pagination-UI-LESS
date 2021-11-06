// src/__tests__/sum.test.ts
import paginationUiLess from './index'

test('init paginationUiLess currentPage is 1', () => {
  // Arrange
  const pagesLength = 29
  const onChange = () => isUpdated = true
  let isUpdated = false
  const currentPage = 1

  // Act
  const pagination = paginationUiLess({
    pagesLength,
    onChange,
  })

  // Assert
  expect(pagination.getCurrentPage()).toBe(currentPage)
})

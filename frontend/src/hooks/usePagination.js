export const usePagination = (data, currentPage, rowsPerPage) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return data.slice(startIndex, endIndex);
};

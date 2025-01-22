
// transform URL format by: 1)trim; 2) change to all lower case; 3) remove invalid character; 4) compress whitespaces and dashes
function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, '');  // Trim
  str = str.toLowerCase();
  str = str.replace(/[^a-z0-9 -]/g, '')  // Remove invalid chars
        .replace(/\s+/g, '-')  // Collapse whitespace and replace with `-`
        .replace(/-+/g, '-');  // Collapse dashes

  return str;
}



// return product detail URL given product_id and product_name parameter
export function getProductDetailPath(id: number | string, name: string = 'unknown-product') {
  const nameSlug = slugify(name);
  return `/products/${id}/${nameSlug}`;
}


// return product image URL given product_id parameter
export function getProductImagePath(id: number) {
  return `/product-images/${id}.jpg`;

}

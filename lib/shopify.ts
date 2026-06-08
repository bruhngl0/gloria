import { GET_PRODUCT_QUERY, GET_COLLECTION_QUERY, GET_CART_QUERY, CREATE_CART_MUTATION, ADD_CART_LINES_MUTATION, UPDATE_CART_LINES_MUTATION, REMOVE_CART_LINES_MUTATION } from "./queries";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

export const isMockMode =
  !SHOPIFY_DOMAIN ||
  SHOPIFY_DOMAIN.includes("your-store") ||
  !SHOPIFY_TOKEN ||
  SHOPIFY_TOKEN.includes("your_storefront");

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

// --- High-Fidelity Mock Data ---
export const MOCK_PRODUCT = {
  id: "gid://shopify/Product/1234567890",
  handle: "one-for-all-dress",
  title: "The One for All Dress",
  descriptionHtml: `
    <p class="mb-4">Introducing the cornerstone of your body-first wardrobe. The One for All Dress is designed to honor, hold, and enhance your natural shape. Crafted from a premium heavyweight stretch crepe (280 g/m²), it offers an editorial drape with structural recovery.</p>
    <p class="mb-4">Featuring a flexible cowl-inspired neckline that adapts to varying bust sizes and custom side-ruching that allows you to adjust the length and drape to match your proportions.</p>
    <ul class="list-disc pl-4 space-y-2 text-sbg-grey">
      <li>Ponte-inspired stretch crepe: 58% spandex, 42% rayon</li>
      <li>Mid-weight fabric provides smoothing support without restriction</li>
      <li>Double-lined bodice for clean, stitch-free edges</li>
      <li>Proudly made with body-type-intentional sizing</li>
    </ul>
  `,
  images: {
    edges: [
      {
        node: {
          url: "/images/point.png",
          altText: "The One for All Dress in Onyx Black - Front View",
          width: 800,
          height: 1067
        }
      },
      {
        node: {
          url: "/images/dress-black-back.jpg",
          altText: "The One for All Dress in Onyx Black - Back Detail View",
          width: 800,
          height: 1067
        }
      },
      {
        node: {
          url: "/images/dress-red-front.jpg",
          altText: "The One for All Dress in Crimson Red - Drape View",
          width: 800,
          height: 1067
        }
      },
      {
        node: {
          url: "/images/dress-blue-front.jpg",
          altText: "The One for All Dress in French Blue - Full Body View",
          width: 800,
          height: 1067
        }
      }
    ]
  },
  metafield: {
    value: JSON.stringify(["All Body Types", "Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Apple"])
  },
  options: [
    {
      name: "Color",
      values: ["Black", "Red", "Baby Blue"]
    },
    {
      name: "Size",
      values: ["XS", "S", "M", "L", "XL"]
    }
  ],
  variants: {
    edges: [] as any[]
  }
};

// Populate the 15 variants dynamically
const colors = ["Black", "Red", "Baby Blue"];
const sizes = ["XS", "S", "M", "L", "XL"];
const colorSwatchesMap: Record<string, string> = {
  "Black": "/images/point.png",
  "Red": "/images/dress-red-front.jpg",
  "Baby Blue": "/images/dress-blue-front.jpg"
};

colors.forEach((color) => {
  sizes.forEach((size) => {
    const isOutOfStock = color === "Red" && size === "XL"; // Mock one out-of-stock size
    const variantId = `gid://shopify/ProductVariant/mock-${color.toLowerCase().replace(" ", "-")}-${size.toLowerCase()}`;
    MOCK_PRODUCT.variants.edges.push({
      node: {
        id: variantId,
        title: `${color} / ${size}`,
        availableForSale: !isOutOfStock,
        price: {
          amount: "185.00",
          currencyCode: "CAD"
        },
        selectedOptions: [
          { name: "Color", value: color },
          { name: "Size", value: size }
        ],
        image: {
          url: colorSwatchesMap[color],
          altText: `The One for All Dress in ${color} - Size ${size}`
        }
      }
    });
  });
});

export const MOCK_COLLECTION = {
  id: "gid://shopify/Collection/111",
  title: "Shop All",
  products: {
    edges: [
      {
        node: {
          id: MOCK_PRODUCT.id,
          handle: MOCK_PRODUCT.handle,
          title: MOCK_PRODUCT.title,
          priceRange: {
            minVariantPrice: {
              amount: "185.00",
              currencyCode: "CAD"
            }
          },
          images: {
            edges: [
              { node: { url: "/images/point.png", altText: "Front view of black dress" } },
              { node: { url: "/images/dress-black-back.jpg", altText: "Back view of black dress" } }
            ]
          },
          tags: ["new"],
          metafield: MOCK_PRODUCT.metafield,
          variants: MOCK_PRODUCT.variants
        }
      }
    ]
  }
};

// --- Client-Side Mock Cart State Helpers ---
interface MockCartLineInput {
  merchandiseId: string;
  quantity: number;
}

function getLocalMockCart(): any {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("sbg-mock-cart");
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      // Ignore
    }
  }
  return {
    id: "mock-cart-id",
    checkoutUrl: "https://checkout.shopify.com/mock-checkout-session",
    totalQuantity: 0,
    cost: {
      totalAmount: { amount: "0.00", currencyCode: "CAD" }
    },
    lines: { edges: [] }
  };
}

function saveLocalMockCart(cart: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("sbg-mock-cart", JSON.stringify(cart));
}

function resolveVariant(variantId: string): any {
  const variantEdge = MOCK_PRODUCT.variants.edges.find(e => e.node.id === variantId);
  return variantEdge ? variantEdge.node : null;
}

function recalculateCartTotals(cart: any) {
  let qty = 0;
  let total = 0;
  cart.lines.edges.forEach((edge: any) => {
    qty += edge.node.quantity;
    total += edge.node.quantity * parseFloat(edge.node.merchandise.price.amount);
  });
  cart.totalQuantity = qty;
  cart.cost.totalAmount.amount = total.toFixed(2);
}

// --- Combined Fetch Client ---
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (isMockMode) {
    // Return mock data after simulating network latency
    await new Promise((resolve) => setTimeout(resolve, 150));

    // 1. Get Product Query
    if (query.includes("query GetProduct")) {
      const handle = variables?.handle;
      if (handle === "one-for-all-dress") {
        return { product: MOCK_PRODUCT } as unknown as T;
      }
      return { product: null } as unknown as T;
    }

    // 2. Get Collection Query
    if (query.includes("query GetCollection")) {
      return { collection: MOCK_COLLECTION } as unknown as T;
    }

    // 3. Cart Mutations & Queries
    if (query.includes("query GetCart")) {
      return { cart: getLocalMockCart() } as unknown as T;
    }

    if (query.includes("mutation CartCreate")) {
      const input = (variables?.input || {}) as any;
      const linesInput = (input.lines || []) as MockCartLineInput[];
      const cart = getLocalMockCart() || {
        id: "mock-cart-id",
        checkoutUrl: "https://checkout.shopify.com/mock-checkout-session",
        totalQuantity: 0,
        cost: { totalAmount: { amount: "0.00", currencyCode: "CAD" } },
        lines: { edges: [] }
      };
      
      linesInput.forEach((line) => {
        const variant = resolveVariant(line.merchandiseId);
        if (variant) {
          cart.lines.edges.push({
            node: {
              id: `mock-line-${Date.now()}-${Math.random()}`,
              quantity: line.quantity,
              merchandise: {
                ...variant,
                product: { title: MOCK_PRODUCT.title }
              }
            }
          });
        }
      });
      recalculateCartTotals(cart);
      saveLocalMockCart(cart);
      return { cartCreate: { cart } } as unknown as T;
    }

    if (query.includes("mutation CartLinesAdd")) {
      const cartId = variables?.cartId as string;
      const linesInput = (variables?.lines || []) as MockCartLineInput[];
      const cart = getLocalMockCart();

      linesInput.forEach((line) => {
        const variant = resolveVariant(line.merchandiseId);
        if (variant) {
          // Check if item already exists in cart
          const existingLine = cart.lines.edges.find((e: any) => e.node.merchandise.id === line.merchandiseId);
          if (existingLine) {
            existingLine.node.quantity += line.quantity;
          } else {
            cart.lines.edges.push({
              node: {
                id: `mock-line-${Date.now()}-${Math.random()}`,
                quantity: line.quantity,
                merchandise: {
                  ...variant,
                  product: { title: MOCK_PRODUCT.title }
                }
              }
            });
          }
        }
      });
      recalculateCartTotals(cart);
      saveLocalMockCart(cart);
      return { cartLinesAdd: { cart } } as unknown as T;
    }

    if (query.includes("mutation CartLinesUpdate")) {
      const linesInput = (variables?.lines || []) as { id: string; quantity: number }[];
      const cart = getLocalMockCart();

      linesInput.forEach((line) => {
        const existingLine = cart.lines.edges.find((e: any) => e.node.id === line.id);
        if (existingLine) {
          existingLine.node.quantity = line.quantity;
        }
      });
      // Filter out zero quantities
      cart.lines.edges = cart.lines.edges.filter((e: any) => e.node.quantity > 0);
      recalculateCartTotals(cart);
      saveLocalMockCart(cart);
      return { cartLinesUpdate: { cart } } as unknown as T;
    }

    if (query.includes("mutation CartLinesRemove")) {
      const lineIds = (variables?.lineIds || []) as string[];
      const cart = getLocalMockCart();

      cart.lines.edges = cart.lines.edges.filter((e: any) => !lineIds.includes(e.node.id));
      recalculateCartTotals(cart);
      saveLocalMockCart(cart);
      return { cartLinesRemove: { cart } } as unknown as T;
    }

    return {} as T;
  }

  // --- Real Shopify Fetch ---
  try {
    const res = await fetch(SHOPIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR: cache product data for 60s
    });

    const { data, errors } = await res.json();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data as T;
  } catch (error: any) {
    console.error("Shopify Storefront API fetch error:", error);
    throw error;
  }
}

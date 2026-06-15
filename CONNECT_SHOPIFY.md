# Connecting Styled by Gloria (SBG) to Your Shopify Store

Follow this step-by-step guide to connect your Next.js headless storefront to your Shopify store using the **Shopify Storefront API**.

---

## Step 1: Create a Custom App in Shopify Admin

To use the Storefront API, you must generate a Storefront Access Token by creating a custom app in your Shopify Admin dashboard.

1. **Log in** to your Shopify Admin panel.
2. Go to **Settings** (bottom-left corner) → **Apps and sales channels**.
3. Click on **Develop apps** (at the top).
4. Click **Create an app**.
   * **App name:** `SBG Storefront` (or any name you prefer).
   * **App developer:** Select your account.
5. Click **Create app**.

---

## Step 2: Configure Storefront API Scopes

Once the app is created, you need to grant it permissions (scopes) to read product, collection, and cart details.

1. In your new app’s configuration screen, click the **Configuration** tab.
2. Scroll down to the **Storefront API integration** section and click **Configure**.
3. Under **Storefront API access scopes**, check the boxes next to the following permissions:
   * [x] `unauthenticated_read_product_listings` — *Allows fetching products and collections.*
   * [x] `unauthenticated_read_product_inventory` — *Allows checking if variants are in-stock or sold-out.*
   * [x] `unauthenticated_write_checkouts` & `unauthenticated_write_customers` — *Allows creating carts and redirecting customers to Shopify's secure checkout page.*
   * [x] `unauthenticated_read_selling_plans` — *Allows reading product options.*
4. Click **Save** at the bottom/top of the screen.

---

## Step 3: Install & Get Your API Credentials

Now, install your app to generate your public access token.

1. Switch to the **API credentials** tab in your custom app.
2. Click **Install app** and confirm installation.
3. In the **Storefront API access tokens** section, copy the:
   * **Storefront API access token** (This is a public token, safe to expose in client-side code).
4. Note your **Shopify Store Domain** (e.g. `your-store-name.myshopify.com`).

---

## Step 4: Configure Environment Variables

1. Open the project root and locate the `.env.local` file.
2. Update the variables with your Shopify store credentials:

```env
# Shopify Storefront API Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_copied_storefront_access_token
```

> **Note:** Once these variables are set, the app will automatically exit **Mock Mode** and start querying your live Shopify store.

---

## Step 5: Configure Product Metafields for "Body Types"

To show body-type recommendations for your products (e.g. *"Works beautifully for Hourglass, Pear"*), set up a custom metafield definition in Shopify.

1. In Shopify Admin, go to **Settings** → **Custom data** → **Products**.
2. Click **Add definition**.
3. Configure the metafield as follows:
   * **Name:** `Body Types`
   * **Namespace and key:** `sbg.body_types` *(Ensure this exact key is used, as the frontend queries it directly)*.
   * **Description:** List of body types this garment is designed for.
   * **Type:** Select **List of values** → **Single line text**.
4. Click **Save**.

### Assigning Body Types to a Product:
1. Go to **Products** in your Shopify Admin.
2. Select a product (e.g., *The One for All Dress*).
3. Scroll to the bottom to the **Metafields** section.
4. Locate **Body Types** and add the list of tags (e.g. `Hourglass`, `Pear`, `Rectangle`).
5. Save the product changes.

---

## Step 6: Verify Store Configuration

1. Make sure your product has variants with **Size** and **Color** options matching your storefront.
2. Run the development server locally:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` and navigate to the **Shop** page to see your live products loaded directly from your Shopify store!

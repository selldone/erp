# Order Data Structure Guide

This document provides a detailed overview of the order data structure when integrating your ERP system with Selldone
shops. Understanding this structure is crucial for accurate data mapping and seamless integration.

## Table of Contents

1. [Order Object Structure](#order-object-structure)
2. [Order Fields Explained](#order-fields-explained)
3. [Product Object Structure](#product-object-structure)
4. [Product Fields Explained](#product-fields-explained)
5. [Variant Object Structure](#variant-object-structure)
6. [Variant Fields Explained](#variant-fields-explained)

---

## Order Object Structure

An order object in Selldone contains comprehensive details about a customer's purchase, including items, buyer
information, delivery details, and more.

### Sample Order JSON

```json
{
  "id": 9019,
  "label": null,
  "shop_id": 1,
  "user_id": 2,
  "customer_id": 7610,
  "code": null,
  "type": "PHYSICAL",
  "stack": 0,
  "status": "Payed",
  "reject": null,
  "reject_at": null,
  "receiver_info": {
    ...
  },
  "delivery_info": {
    ...
  },
  "delivery_price": 556.77,
  "delivery_state": "ToCustomer",
  "delivery_at": null,
  "billing": null,
  "tax": null,
  "tax_shipping": null,
  "tax_included": null,
  "lottery_id": null,
  "link_id": null,
  "discount": 42.82,
  "affiliate_id": null,
  "email_id": null,
  "channel": null,
  "subscription_id": null,
  "meta": null,
  "chat": null,
  "price": 599.95,
  "currency": "USD",
  "payment_id": 2874,
  "payment_type": "stripe",
  "reserved_at": "2024-08-17T16:29:26.000000Z",
  "updated_at": "2024-08-31T16:40:08.000000Z",
  "items": [
    ...
  ],
  "buyer": {
    ...
  },
  "customer": {
    ...
  },
  "gateway_processing": null,
  "basket_item_returns": []
}
```

---

## Order Fields Explained

Below is a comprehensive table explaining each field in the order object.

### Order Fields

| **Field Name**        | **Type**           | **Possible Values**                                                       | **Description**                                                                                                              |
|-----------------------|--------------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `id`                  | `int`              | Positive integer                                                          | Unique identifier for the order.                                                                                             |
| `label`               | `string` or `null` | Any string                                                                | Custom order label or identifier (optional).                                                                                 |
| `shop_id`             | `int`              | Positive integer                                                          | Identifier of the shop where the order was placed.                                                                           |
| `user_id`             | `int`              | Positive integer                                                          | Identifier of the user who placed the order.                                                                                 |
| `customer_id`         | `int` or `null`    | Positive integer or `null`                                                | Identifier of the customer (if registered).                                                                                  |
| `code`                | `int` or `null`    | Positive integer or `null`                                                | Guest code for non-registered customers (if applicable).                                                                     |
| `type`                | `string`           | `PHYSICAL`, `VIRTUAL`, `SERVICE`, `FILE`, `SUBSCRIPTION`                  | Type of order, indicating the nature of products/services purchased.                                                         |
| `stack`               | `int`              | `0`, `1`, `2`, etc.                                                       | Order origin: <br/>`0`: Online basket <br/>`1`: Affiliate POS <br/>`2`: Subscription Auto <br/>Others for specific channels. |
| `status`              | `string`           | `Open`, `Reserved`, `Payed`, `Canceled`, `COD`                            | Current status of the order.                                                                                                 |
| `reject`              | `string` or `null` | Any string or `null`                                                      | Reason for order rejection (if any).                                                                                         |
| `reject_at`           | `string` or `null` | DateTime string or `null`                                                 | Timestamp when the order was rejected.                                                                                       |
| `receiver_info`       | `object`           | See [Receiver Info Fields](#receiver-info-fields)                         | Information about the recipient for delivery purposes.                                                                       |
| `delivery_info`       | `object`           | See [Delivery Info Fields](#delivery-info-fields)                         | Details about the delivery method and preferences.                                                                           |
| `delivery_price`      | `float`            | Positive decimal                                                          | Cost of delivery for the order.                                                                                              |
| `delivery_state`      | `string`           | `CheckQueue`, `OrderConfirm`, `PreparingOrder`, `SentOrder`, `ToCustomer` | Current state of the delivery process.                                                                                       |
| `delivery_at`         | `string` or `null` | DateTime string or `null`                                                 | Estimated delivery date/time.                                                                                                |
| `billing`             | `object` or `null` | Billing information object or `null`                                      | Billing details such as country, state, address, and business information.                                                   |
| `tax`                 | `float` or `null`  | Decimal or `null`                                                         | Total tax amount applied to the order.                                                                                       |
| `tax_shipping`        | `float` or `null`  | Decimal or `null`                                                         | Tax amount applied to the shipping cost.                                                                                     |
| `tax_included`        | `bool` or `null`   | `true`, `false`, or `null`                                                | Indicates if tax is included in the product prices.                                                                          |
| `lottery_id`          | `int` or `null`    | Positive integer or `null`                                                | Identifier of the associated lottery (if any).                                                                               |
| `link_id`             | `int` or `null`    | Positive integer or `null`                                                | Identifier for campaign tracking links.                                                                                      |
| `discount`            | `float`            | Positive decimal                                                          | Total discount applied to the order.                                                                                         |
| `affiliate_id`        | `int` or `null`    | Positive integer or `null`                                                | Identifier of the affiliate associated with the order.                                                                       |
| `email_id`            | `int` or `null`    | Positive integer or `null`                                                | Identifier of the email used for the order (if applicable).                                                                  |
| `channel`             | `string` or `null` | Any string or `null`                                                      | Acquisition channel information.                                                                                             |
| `subscription_id`     | `int` or `null`    | Positive integer or `null`                                                | Identifier of the parent subscription order (if any).                                                                        |
| `meta`                | `object` or `null` | Key-value pairs or `null`                                                 | Additional metadata for the order (private). Useful for storing third-party IDs or extra information.                        |
| `chat`                | `array` or `null`  | Array of chat messages or `null`                                          | Communication between the buyer and seller regarding the order.                                                              |
| `price`               | `float`            | Positive decimal                                                          | Total price of the order before discounts and taxes.                                                                         |
| `currency`            | `string`           | Currency code (e.g., `USD`, `EUR`)                                        | Currency used in the order.                                                                                                  |
| `payment_id`          | `int` or `null`    | Positive integer or `null`                                                | Identifier of the payment transaction.                                                                                       |
| `payment_type`        | `string` or `null` | Payment method used (e.g., `stripe`, `paypal`) or `null`                  | Type of payment used for the order.                                                                                          |
| `reserved_at`         | `string`           | DateTime string                                                           | Timestamp when the order was reserved/placed.                                                                                |
| `updated_at`          | `string`           | DateTime string                                                           | Timestamp when the order was last updated.                                                                                   |
| `items`               | `array`            | See [Order Items Fields](#order-items-fields)                             | Array of items included in the order.                                                                                        |
| `buyer`               | `object` or `null` | See [Buyer Info Fields](#buyer-info-fields) or `null`                     | Information about the buyer. May be `null` if it's a guest checkout.                                                         |
| `customer`            | `object` or `null` | See [Customer Info Fields](#customer-info-fields) or `null`               | Customer information associated with the order.                                                                              |
| `gateway_processing`  | `object` or `null` | Payment gateway processing details or `null`                              | Information about the payment processing.                                                                                    |
| `basket_item_returns` | `array`            | Array of return items                                                     | Details of items returned from the order (if any).                                                                           |

### Receiver Info Fields

| **Field Name** | **Type**           | **Description**                                                                |
|----------------|--------------------|--------------------------------------------------------------------------------|
| `country`      | `string`           | Country code (e.g., `US`, `CA`).                                               |
| `state`        | `string` or `null` | State or province name.                                                        |
| `state_code`   | `string` or `null` | State code (e.g., `NY` for New York).                                          |
| `city`         | `string`           | City name.                                                                     |
| `address`      | `string`           | Street address.                                                                |
| `location`     | `object`           | GPS coordinates with `lat` and `lng` fields.                                   |
| `no`           | `string` or `null` | House or building number.                                                      |
| `unit`         | `string` or `null` | Unit or apartment number.                                                      |
| `name`         | `string`           | Recipient's full name.                                                         |
| `phone`        | `string`           | Recipient's phone number.                                                      |
| `message`      | `string` or `null` | Additional delivery instructions.                                              |
| `postal`       | `string` or `null` | Postal or ZIP code.                                                            |
| `pickup`       | `bool` or `null`   | Indicates if the order is for pickup (`true`) or delivery (`false` or `null`). |

### Delivery Info Fields

| **Field Name**      | **Type**           | **Description**                                                          |
|---------------------|--------------------|--------------------------------------------------------------------------|
| `type`              | `string`           | Delivery method type (e.g., `PostFast`, `Pickup`, `Motorbike`).          |
| `connect_shippings` | `array` or `null`  | Array of connected shipping methods with `connect_id` and `shipping_id`. |
| `connect_delivery`  | `int`              | Indicates if connected delivery is used (`0` for no, `1` for yes).       |
| `inbound_delivery`  | `int`              | Inbound delivery option (e.g., `1` for yes, `0` for no).                 |
| `outbound_delivery` | `int`              | Outbound delivery option.                                                |
| `distance`          | `float`            | Delivery distance in kilometers or miles.                                |
| `volume`            | `object`           | Dimensions of the package (`width`, `length`, `height`).                 |
| `weight`            | `float`            | Weight of the package.                                                   |
| `days`              | `array`            | Preferred delivery days (e.g., `Monday`, `Tuesday`).                     |
| `time_spans`        | `array`            | Preferred delivery time spans (e.g., `Morning`, `Evening`).              |
| `custom`            | `bool` or `null`   | Indicates if custom delivery options are used.                           |
| `date`              | `string` or `null` | Specific delivery date requested by the customer.                        |
| `delivery_at`       | `string` or `null` | Estimated or scheduled delivery date/time.                               |

### Order Items Fields

Each item in the `items` array contains the following fields:

| **Field Name**          | **Type**            | **Description**                                        |
|-------------------------|---------------------|--------------------------------------------------------|
| `id`                    | `int`               | Unique identifier for the order item.                  |
| `basket_id`             | `int`               | Identifier of the associated basket/order.             |
| `product_id`            | `int`               | Identifier of the product.                             |
| `variant_id`            | `int` or `null`     | Identifier of the product variant (if applicable).     |
| `connect_id`            | `int` or `null`     | Identifier for connected services or integrations.     |
| `message`               | `string` or `null`  | Custom message or note for the item.                   |
| `preferences`           | `object` or `array` | Customer preferences or customizations for the item.   |
| `count`                 | `int`               | Quantity of the item ordered.                          |
| `price`                 | `float`             | Price per unit of the item.                            |
| `currency`              | `string`            | Currency code for the item price.                      |
| `dis`                   | `float`             | Discount applied to the item.                          |
| `offer_id`              | `int` or `null`     | Identifier of any special offer applied.               |
| `offer_count`           | `int`               | Quantity applicable for the offer.                     |
| `offer_amount`          | `float`             | Amount discounted due to the offer.                    |
| `cross_dis`             | `float`             | Cross-discount amount (if applicable).                 |
| `tax`                   | `object` or `null`  | Tax details for the item, including amounts and rates. |
| `check`                 | `bool`              | Indicates if the item is checked for purchase.         |
| `fulfillment_id`        | `int` or `null`     | Identifier of the fulfillment process.                 |
| `subscription_price_id` | `int` or `null`     | Identifier for subscription pricing (if applicable).   |
| `vendor_id`             | `int` or `null`     | Vendor identifier (for marketplace scenarios).         |
| `vendor_product_id`     | `int` or `null`     | Vendor's product identifier.                           |
| `extra_pricing_id`      | `int` or `null`     | Identifier for extra pricing options.                  |
| `created_at`            | `string`            | DateTime when the item was added to the order.         |
| `updated_at`            | `string`            | DateTime when the item was last updated.               |
| `product`               | `object`            | See [Product Fields](#product-fields-explained)        |
| `variant`               | `object` or `null`  | See [Variant Fields](#variant-fields-explained)        |

### Buyer Info Fields

| **Field Name** | **Type** | **Description**               |
|----------------|----------|-------------------------------|
| `id`           | `int`    | Identifier of the buyer user. |
| `name`         | `string` | Buyer's full name.            |
| `email`        | `string` | Buyer's email address.        |
| `phone`        | `string` | Buyer's phone number.         |

### Customer Info Fields

| **Field Name** | **Type**        | **Description**                  |
|----------------|-----------------|----------------------------------|
| `id`           | `int`           | Identifier of the customer.      |
| `user_id`      | `int` or `null` | User identifier (if registered). |
| `name`         | `string`        | Customer's full name.            |
| `email`        | `string`        | Customer's email address.        |
| `phone`        | `string`        | Customer's phone number.         |

---

## Product Object Structure

Each product in the order items contains detailed information about the product purchased.

### Sample Product JSON

```json
{
  "id": 24095,
  "shop_id": 1,
  "connect_id": null,
  "vendor_id": null,
  "type": "PHYSICAL",
  "unit": null,
  "unit_float": false,
  "price_input": "custom",
  "valuation_id": 1,
  "pricing": "FIX",
  "price": 10,
  "currency": "USD",
  "commission": 0,
  "discount": 0,
  "dis_start": null,
  "dis_end": null,
  "price_label": null,
  "status": "Open",
  "title": "Mug Gloria",
  "title_en": "Gloria MX70",
  "sku": null,
  "mpn": null,
  "gtin": null,
  "gpc": null,
  "hsn": null,
  "condition": "new",
  "brand": null,
  "warranty": null,
  "icon": "shops_1_products_mug3jpg07a0b1ee01d95e018d868ec7e26d023b.jpg",
  "message": null,
  "outputs": [],
  "inputs": [],
  "category_id": null,
  "quantity": 189,
  "limit_min": 0,
  "limit_max": 0,
  "lead": -1,
  "extra": null,
  "style": {
    "contain": true
  },
  "rate": 0,
  "rate_count": 0,
  "return_warranty": 0,
  "original": true,
  "slug": "mug-gloria",
  "note": [
    ...
  ],
  "repository_id": null,
  "reselling": false,
  "guide_id": null,
  "shipping_id": null,
  "tax_id": 9,
  "map_id": null,
  "tags": null,
  "meta": null,
  "parent_id": null,
  "created_at": "2022-07-19T07:46:25.000000Z",
  "updated_at": "2024-08-17T16:29:27.000000Z"
}
```

---

## Product Fields Explained

### Product Fields

| **Field Name**    | **Type**           | **Possible Values**                                      | **Description**                                                                                         |
|-------------------|--------------------|----------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `id`              | `int`              | Positive integer                                         | Unique identifier for the product.                                                                      |
| `shop_id`         | `int`              | Positive integer                                         | Identifier of the shop owning the product.                                                              |
| `connect_id`      | `int` or `null`    | Positive integer or `null`                               | Identifier for connected services or integrations.                                                      |
| `vendor_id`       | `int` or `null`    | Positive integer or `null`                               | Vendor identifier (for marketplace scenarios).                                                          |
| `type`            | `string`           | `PHYSICAL`, `VIRTUAL`, `SERVICE`, `FILE`, `SUBSCRIPTION` | Type of product.                                                                                        |
| `unit`            | `string` or `null` | Unit of measurement (e.g., `kg`, `item`) or `null`       | Unit in which the product is measured.                                                                  |
| `unit_float`      | `bool`             | `true` or `false`                                        | Indicates if the product can be ordered in fractional units.                                            |
| `price_input`     | `string`           | `default`, `custom`                                      | Pricing input type.                                                                                     |
| `valuation_id`    | `int` or `null`    | Positive integer or `null`                               | Identifier for the valuation associated with the product.                                               |
| `pricing`         | `string`           | `FIX`, `VAR`                                             | Pricing strategy of the product.                                                                        |
| `price`           | `float`            | Positive decimal                                         | Base price of the product.                                                                              |
| `currency`        | `string`           | Currency code (e.g., `USD`, `EUR`)                       | Currency used in the product pricing.                                                                   |
| `commission`      | `float`            | Positive decimal                                         | Commission rate applicable to the product.                                                              |
| `discount`        | `float`            | Positive decimal                                         | Discount amount applicable to the product.                                                              |
| `dis_start`       | `string` or `null` | DateTime string or `null`                                | Start date of the discount period.                                                                      |
| `dis_end`         | `string` or `null` | DateTime string or `null`                                | End date of the discount period.                                                                        |
| `price_label`     | `string` or `null` | Any string or `null`                                     | Additional pricing information (e.g., `$1.5/Fl Oz`).                                                    |
| `status`          | `string`           | `Open`, `Close`                                          | Availability status of the product.                                                                     |
| `title`           | `string`           | Any string                                               | Main title of the product.                                                                              |
| `title_en`        | `string` or `null` | Any string or `null`                                     | English title or alternative title.                                                                     |
| `sku`             | `string` or `null` | Any string or `null`                                     | Stock Keeping Unit, unique product identifier.                                                          |
| `mpn`             | `string` or `null` | Any string or `null`                                     | Manufacturer Part Number.                                                                               |
| `gtin`            | `string` or `null` | Any string or `null`                                     | Global Trade Item Number.                                                                               |
| `gpc`             | `string` or `null` | Any string or `null`                                     | Google Product Category code.                                                                           |
| `hsn`             | `string` or `null` | Any string or `null`                                     | Harmonized System Nomenclature code for trade.                                                          |
| `condition`       | `string`           | `new`, `used`, etc.                                      | Condition of the product.                                                                               |
| `brand`           | `string` or `null` | Any string or `null`                                     | Brand name of the product.                                                                              |
| `warranty`        | `string` or `null` | Warranty terms or `null`                                 | Warranty information for the product.                                                                   |
| `icon`            | `string` or `null` | URL or file path or `null`                               | Icon image of the product.                                                                              |
| `message`         | `string` or `null` | Any string or `null`                                     | Custom message associated with the product.                                                             |
| `outputs`         | `array`            | List of output forms (for virtual products)              | Output options for virtual products.                                                                    |
| `inputs`          | `array`            | List of input forms                                      | Input options for collecting additional information from customers.                                     |
| `category_id`     | `int` or `null`    | Positive integer or `null`                               | Identifier of the primary category.                                                                     |
| `quantity`        | `int`              | Positive integer                                         | Stock quantity available.                                                                               |
| `limit_min`       | `int`              | Non-negative integer                                     | Minimum order quantity allowed.                                                                         |
| `limit_max`       | `int`              | Non-negative integer                                     | Maximum order quantity allowed.                                                                         |
| `lead`            | `int`              | Integer                                                  | Lead time in days. `-1` indicates no lead time.                                                         |
| `extra`           | `object` or `null` | Additional attributes or `null`                          | Additional product attributes (e.g., dimensions, weight).                                               |
| `style`           | `object` or `null` | Styling options or `null`                                | Styling information for the product display.                                                            |
| `rate`            | `float`            | Decimal between `0` and `5`                              | Average customer rating.                                                                                |
| `rate_count`      | `int`              | Non-negative integer                                     | Number of customer ratings.                                                                             |
| `return_warranty` | `int`              | Non-negative integer                                     | Return warranty period in hours.                                                                        |
| `original`        | `bool`             | `true` or `false`                                        | Indicates if the product is original.                                                                   |
| `slug`            | `string`           | URL-friendly string                                      | SEO-friendly URL slug for the product.                                                                  |
| `note`            | `array`            | Array of notes                                           | Internal notes about the product (e.g., updates, changes).                                              |
| `repository_id`   | `int` or `null`    | Positive integer or `null`                               | Identifier of the product's repository source (if applicable).                                          |
| `reselling`       | `bool`             | `true` or `false`                                        | Indicates if the product is available for reselling (drop-shipping).                                    |
| `guide_id`        | `int` or `null`    | Positive integer or `null`                               | Identifier for the guide profile associated with the product.                                           |
| `shipping_id`     | `int` or `null`    | Positive integer or `null`                               | Identifier for the shipping profile associated with the product.                                        |
| `tax_id`          | `int` or `null`    | Positive integer or `null`                               | Identifier for the tax profile associated with the product.                                             |
| `map_id`          | `int` or `null`    | Positive integer or `null`                               | Identifier for the map tag associated with the product.                                                 |
| `tags`            | `array` or `null`  | List of tags or `null`                                   | Tags associated with the product for categorization or search.                                          |
| `meta`            | `object` or `null` | Key-value pairs or `null`                                | Additional metadata for the product (private). Useful for storing third-party IDs or extra information. |
| `parent_id`       | `int` or `null`    | Positive integer or `null`                               | Identifier of the parent product (for variants or reselling).                                           |
| `created_at`      | `string`           | DateTime string                                          | Creation timestamp of the product.                                                                      |
| `updated_at`      | `string`           | DateTime string                                          | Last updated timestamp of the product.                                                                  |

---

## Variant Object Structure

Variants represent different versions of a product, such as different sizes, colors, or styles.

### Sample Variant JSON

```json
{
  "id": 143271,
  "shop_id": 1,
  "product_id": 240218,
  "sku": "6479D9E797F27_Black",
  "mpn": "3913148609",
  "gtin": null,
  "color": "#101010",
  "style": null,
  "volume": "One Size",
  "weight": null,
  "pack": null,
  "type": null,
  "pricing": true,
  "price": 25.5,
  "currency": "EUR",
  "commission": 0,
  "discount": 0,
  "dis_start": null,
  "dis_end": null,
  "price_label": null,
  "quantity": 99997,
  "image": "https://files.cdn.printful.com/files/f0f/f0f3d2c17e2393984b257c5c0fd306a6_preview.png",
  "enable": true,
  "lead": -1,
  "extra": null,
  "deleted_at": null,
  "created_at": "2023-06-11T09:13:16.000000Z",
  "updated_at": "2024-03-10T07:34:55.000000Z",
  "ar": null,
  "parent_id": null,
  "meta": {
    "printful_variant_id": 10457
  }
}
```

---

## Variant Fields Explained

### Variant Fields

| **Field Name** | **Type**           | **Possible Values**                    | **Description**                                                                                         |
|----------------|--------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `id`           | `int`              | Positive integer                       | Unique identifier for the variant.                                                                      |
| `shop_id`      | `int`              | Positive integer                       | Identifier of the shop owning the variant.                                                              |
| `product_id`   | `int`              | Positive integer                       | Identifier of the associated product.                                                                   |
| `sku`          | `string` or `null` | Any string or `null`                   | Stock Keeping Unit for the variant.                                                                     |
| `mpn`          | `string` or `null` | Any string or `null`                   | Manufacturer Part Number.                                                                               |
| `gtin`         | `string` or `null` | Any string or `null`                   | Global Trade Item Number.                                                                               |
| `color`        | `string` or `null` | Color code (e.g., `#FFFFFF`) or `null` | Color attribute of the variant.                                                                         |
| `style`        | `string` or `null` | Any string or `null`                   | Style attribute of the variant.                                                                         |
| `volume`       | `string` or `null` | Any string or `null`                   | Volume or size attribute (e.g., `M`, `L`).                                                              |
| `weight`       | `string` or `null` | Any string or `null`                   | Weight attribute.                                                                                       |
| `pack`         | `string` or `null` | Any string or `null`                   | Packaging information.                                                                                  |
| `type`         | `string` or `null` | Any string or `null`                   | Type attribute of the variant.                                                                          |
| `pricing`      | `bool`             | `true` or `false`                      | Indicates if the variant has independent pricing from the main product.                                 |
| `price`        | `float`            | Positive decimal                       | Price of the variant (if independent pricing is enabled).                                               |
| `currency`     | `string`           | Currency code (e.g., `USD`, `EUR`)     | Currency used in the variant pricing.                                                                   |
| `commission`   | `float`            | Positive decimal                       | Commission rate applicable to the variant.                                                              |
| `discount`     | `float`            | Positive decimal                       | Discount amount applicable to the variant.                                                              |
| `dis_start`    | `string` or `null` | DateTime string or `null`              | Start date of the discount period.                                                                      |
| `dis_end`      | `string` or `null` | DateTime string or `null`              | End date of the discount period.                                                                        |
| `price_label`  | `string` or `null` | Any string or `null`                   | Additional pricing information for the variant.                                                         |
| `quantity`     | `int`              | Positive integer                       | Stock quantity available for the variant.                                                               |
| `image`        | `string` or `null` | URL or file path or `null`             | Image representing the variant.                                                                         |
| `enable`       | `bool`             | `true` or `false`                      | Indicates if the variant is enabled for sale.                                                           |
| `lead`         | `int`              | Integer                                | Lead time in days for the variant. `-1` indicates no lead time.                                         |
| `extra`        | `object` or `null` | Additional attributes or `null`        | Additional variant attributes.                                                                          |
| `ar`           | `object` or `null` | Augmented reality data or `null`       | Data for AR representations of the variant.                                                             |
| `deleted_at`   | `string` or `null` | DateTime string or `null`              | Deletion timestamp if the variant is soft-deleted.                                                      |
| `created_at`   | `string`           | DateTime string                        | Creation timestamp of the variant.                                                                      |
| `updated_at`   | `string`           | DateTime string                        | Last updated timestamp of the variant.                                                                  |
| `parent_id`    | `int` or `null`    | Positive integer or `null`             | Identifier of the parent variant (for reselling or inheritance).                                        |
| `meta`         | `object` or `null` | Key-value pairs or `null`              | Additional metadata for the variant (private). Useful for storing third-party IDs or extra information. |

---

By understanding the fields and their meanings, you can accurately map the Selldone order data to your ERP system's data
structures, ensuring a smooth integration and data consistency across platforms.
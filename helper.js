function GET_SHOP_IMAGE_PATH(file_name, size = null, random_fill = false) {
    // Debug information
    console.log('Debug > GET_SHOP_IMAGE_PATH ', file_name, size);

    if (!file_name) {
        if (random_fill && Number.isInteger(random_fill)) {
            return PlaceholderImages.GetIDImage(random_fill);
        }
        if (random_fill) {
            return PlaceholderImages.GetRamonImage();
        }
        return imagePlaceholder;
    }

    // Invalid size mode file formats:
    try {
        if (file_name.endsWith(".svg")) {
            // SVG not supported for direct size mode!
            size = null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }

    // Check if it is an absolute path (In the page builder template!):
    if (
        file_name.startsWith("https://") ||
        file_name.startsWith("http://") ||
        file_name.startsWith("/") /*Relative Path*/
    ) {
        // Absolute CDN address: (Can assign size to path!)
        if (file_name.startsWith("https://cdn.selldone.") && size) {
            return `${file_name}${size}.png`;
        } else if (size) {
            // return `${file_name}?size=${size}`; // Important: Some websites like Reddit block added queries!
        }

        return file_name;
    }

    // Handle direct storage URLs
    if (
        (!size || window.storage_direct_thumbnails) &&
        window.storage_direct_url &&
        window.storage_direct
    ) {
        // No query only can get directly from cloud storage!

        // Replace _ to slash (File format save in DB to real path)
        file_name = file_name.replace(/_/gi, "/");

        if (file_name.startsWith("repository:")) {
            // Handle repository files address
            file_name = file_name.replace("repository:", "");
            return `${window.storage_direct_url}/repository/${file_name}`;
        } else if (file_name.startsWith("instagram:")) {
            // Handle Instagram files address
            file_name = file_name.replace("instagram:", "");
            return `${window.storage_direct_url}/instagram/${file_name}`;
        } else {
            // Handle normal files address
            file_name = file_name + (size ? `${size}.png` : "");
            return `${window.storage_direct_url}/app/${file_name}`;
        }
    } else {
        return (
            `${window.shop_cdn_images}/${file_name}` +
            (size !== null ? `?size=${size}` : "")
        );
    }
}

// Ensure global variables are defined
window.imagePlaceholder = "https://via.placeholder.com/150";
window.shop_cdn_images = "https://cdn.selldone.com";
window.storage_direct_url = "https://cdn.selldone.com";
window.storage_direct = true;
window.storage_direct_thumbnails = true;
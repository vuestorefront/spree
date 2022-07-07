export default {
  shared: {
    form: {
      email: 'Email',
      first_name: 'First Name',
      last_name: 'Last Name',
      street: 'Street Name',
      apartment: 'House/Apartment number',
      city: 'Last Name',
      state: 'State/Province',
      country: 'Country',
      postal_code: 'Zip-code',
      phone_number: 'Phone number'
    }
  },
  composables: {
    facet_getters: {
      sort_price_ascending: 'Price ascending',
      sort_price_descending: 'Price descending',
      sort_updated_at_ascending: 'Updated at ascending',
      sort_updated_at_descending: 'Updated at descending'
    }
  },
  pages: {
    checkout: {
      billing: {
        billing_heading: 'Billing',
        first_name_label: '@:shared.form.first_name',
        last_name_label: '@:shared.form.last_name',
        street_label: '@:shared.form.street',
        apartment_label: '@:shared.form.apartment',
        city_label: '@:shared.form.city',
        state_label: '@:shared.form.state',
        country_label: '@:shared.form.country',
        postal_code_label: '@:shared.form.postal_code',
        phone_number_label: '@:shared.form.phone_number',
        button_go_back_label: 'Go back',
        button_continue_to_payment_label: 'Continue to payment'
      },
      payment: {
        payment_heading: 'Payment',
        item: 'Item',
        i_agree_to: 'I agree to',
        terms_and_conditions: 'Terms and conditions',
        go_back: 'Go back',
        make_an_order: 'Make an order',
        table_headers: [
          { key: 'description', value: 'Description' },
          { key: 'size', value: 'Size' },
          { key: 'color', value: 'Color' },
          { key: 'quantity', value: 'Quantity' },
          { key: 'amount', value: 'Amount' }
        ]
      },
      shipping: {
        shipping_heading: 'Shipping',
        select_shipping_method: 'Select shipping method',
        email_label: '@:shared.form.email',
        first_name_label: '@:shared.form.first_name',
        last_name_label: '@:shared.form.last_name',
        street_label: '@:shared.form.street',
        apartment_label: '@:shared.form.apartment',
        city_label: '@:shared.form.city',
        state_label: '@:shared.form.state',
        country_label: '@:shared.form.country',
        postal_code_label: '@:shared.form.postal_code',
        phone_number_label: '@:shared.form.phone_number',
        save_address_label: '@:shared.form.save_address',
        shipping_to_billing_label: 'Use the same details for billing',
        button_go_back_label: 'Go back',
        button_continue_to_payment_label: 'Continue to payment'
      },
      thank_you: {
        order_no: 'Order No.',
        successful_placed_order: 'You have successfully placed the order. You can check status of your order by using our delivery status feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.',
        allow_order_notifications: 'Allow order notifications',
        info_after_order: 'You can log to your account using e-mail and password defined earlier. On your account you can edit your profile data, check history of transactions, edit subscription to newsletter.',
        feedback: 'Your feedback is important to us. Let us know what we could improve.',
        send_my_feedback: 'Send my feedback',
        go_back_to_shop: 'Go back to shop',
        thank_you_banner_title: 'Thank you for your order!',
        your_purchase_title: 'Your Purchase',
        questions_contacts_title: 'Primary contacts for any questions',
        your_account_title: 'Your Account',
        what_can_we_improve: 'What can we improve'
      }
    },
    my_account: {
      tab_title_personal_data: 'Personal data',
      tab_title_password_change: 'Password change',
      content_page_title_my_account: 'My Account',
      content_category_title_personal_details: 'Personal details',
      content_page_title_my_profile: 'My profile',
      content_page_title_saved_addresses: 'Saved addresses',
      content_category_title_order_details: 'Order details',
      content_page_title_order_history: 'Order history',
      content_page_title_order_details: 'Order details',
      content_page_title_log_out: 'Log out',
      my_profile: {
        tab_title_personal_data: 'Personal data',
        tab_title_password_change: 'Password change',
        feel_free_to_edit: 'Feel free to edit any of your details below so your account is always up to date',
        use_your_personal_data: 'At Brand name, we attach great importance to privacy issues and are committed to protecting the personal data of our users. Learn more about how we care and use your personal data in the',
        privacy_policy: 'Privacy Policy',
        change_password_your_account: 'If you want to change the password to access your account, enter the following information'
      },
      order_history: {
        details_and_status_orders: 'Check the details and status of your orders in the online store. You can also cancel your order or request a return.',
        you_currently_have_no_orders: 'You currently have no orders',
        start_shopping: 'Start shopping',
        view_details: 'View details',
        total_orders_label: 'Total orders - {totalOrders}',
        table_headers: [
          { key: 'order_id', value: 'Order ID' },
          { key: 'payment_date', value: 'Payment date' },
          { key: 'amount', value: 'Amount' },
          { key: 'status', value: 'Status' }
        ]
      },
      order_details: {
        tab_title: 'Order details - {orderId}',
        table_header_order_id: 'Order id',
        table_header_payment_date: 'Payment date',
        table_header_status: 'Status',
        table_header_total: 'Total',
        button_show_all_orders_label: 'Show all orders',
        products_table_headers: [
          { key: 'products_name', value: 'Name' },
          { key: 'products_quantity', value: 'Quantity' },
          { key: 'products_price', value: 'Price' }
        ]
      },
      saved_addresses_details: {
        tab_title_saved_addresses: 'Saved addresses',
        contact_details_updated: 'Keep your addresses and contact details updated.',
        manage_saved_addresses: 'Manage all the saved addresses you want (work place, home address...). This way you won"t have to enter an address manually with each order.',
        change: 'Change',
        delete: 'Delete',
        add_new_address: 'Add new address',
        tab_title_new_address: 'Add the address',
        tab_title_old_address: 'Update the address'
      }
    },
    category: {
      categories: 'Categories',
      save_for_later: 'Save for later',
      remove_from_wishlist: 'Remove from wishlist',
      show_on_page: 'Show on page'
    },
    home: {
      see_all: 'See all',
      cta_subscribe_title: 'Subscribe',
      cta_subscribe_button_label: 'Subscribe to newsletter',
      cta_subscribe_description: 'Be aware of upcoming sales and events. Receive gifts and special offers!',
      similar_products_heading: 'Match with it',
      aria_label_carousel_arrow_prev: 'prev',
      aria_label_carousel_arrow_next: 'next'
    },
    product: {
      size_select_label: 'Size',
      button_size_guide_label: 'Size guide',
      color_label: 'Color',
      tab_title_description: 'Description',
      tab_title_properties: 'Properties',
      related_products_title: 'Match it with'
    },
    reset_password: {
      reset_password: 'Reset password',
      password: 'Password',
      repeat_password: 'Repeat password',
      save_password: 'Save password',
      password_changed: 'Password changed',
      back_to_home: 'Back to home'
    }
  },
  components: {
    checkout: {
      cart_preview: {
        order_summary: 'Order summary',
        products: 'Products',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        total: 'Total',
        enter_promo_code: 'Enter promo code',
        apply: 'Apply'
      },
      user_billing_address: {
        set_as_default_address: 'Use this address as my default one.'
      },
      user_shipping_address: {
        set_as_default_address: 'Use this address as my default one.'
      },
      vsf_shipping_provider: {
        continue_to_billing: 'Continue to billing'
      }
    },
    my_account: {
      password_reset_form: {
        new_password_label: 'New Password',
        confirm_password_label: 'Confirm New Password'
      },
      profile_update_form: {
        table_data_email: 'Email',
        table_data_store_credits: 'Store Credits',
        table_data_shipping_to: 'Shipping to {firstName} {lastName}',
        table_data_shipping: 'Shipping',
        button_manage_saved_addresses_label: 'Manage saved addresses',
        button_show_recent_orders_label: 'Show recent orders'
      },
      saved_address_form: {
        first_name_label: '@:shared.form.first_name',
        last_name_label: '@:shared.form.last_name',
        street_label: '@:shared.form.street',
        apartment_label: '@:shared.form.apartment',
        city_label: '@:shared.form.city',
        state_label: '@:shared.form.state',
        postal_code_label: '@:shared.form.postal_code',
        country_label: '@:shared.form.country',
        phone_number_label: '@:shared.form.phone_number',
        set_as_default_label: 'Set as default',
        button_add_address_label: 'Add the address',
        button_update_address_label: 'Update the address'
      }
    },
    app_footer: {
      about_us: {
        title: 'About us',
        items: [
          'Who we are',
          'Quality in the details',
          'Customer Reviews'
        ]
      },
      departments: {
        title: 'Departments',
        items: [
          'Women fashion',
          'Men fashion',
          'Kidswear',
          'Home'
        ]
      },
      help: {
        title: 'Help',
        items: [
          'Customer service',
          'Size guide',
          'Contact us'
        ]
      },
      payment_and_delivery: {
        title: 'Payment & Delivery',
        items: [
          'Purchase terms',
          'Guarantee'
        ]
      },
      social: {
        title: 'Social',
        items: [
          'facebook',
          'pinterest',
          'google',
          'twitter',
          'youtube'
        ]
      }
    },
    app_header: {
      search_for_items: 'Search for items',
      aria_label_open_account_button: 'Open account button',
      aria_label_toggle_wishlist_sidebar_button: 'Toggle wishlist sidebar',
      aria_label_toggle_cart_sidebar_button: 'Toggle cart sidebar',
      aria_label_search_bar: 'Search',
      aria_label_close_search_button: 'Close search',
      aria_label_open_search_button: 'Open search',
      alt_header_logo: 'Vue Storefront Next'
    },
    bottom_navigation: {
      label_home_icon: 'Home',
      label_menu_icon: 'Menu',
      label_wishlist_icon: 'Wishlist',
      label_account_icon: 'Account',
      label_basket_icon: 'Basket',
      aria_label_add_to_cart: 'Aria label add to cart'
    },
    cart_sidebar: {
      product_already_in_your_wishlist: 'Product already in your wishlist',
      go_to_checkout: 'Go to checkout',
      go_back_shopping: 'Go back shopping',
      my_cart: 'My Cart',
      total_items: 'Total items',
      your_cart_is_empty_title: 'Your cart is empty',
      your_cart_is_empty_description: 'Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.',
      subtotal_price: 'Subtotal price'
    },
    category_page_header: {
      filters: 'Filters',
      sort_by: 'Sort by',
      select_sorting: 'Select sorting',
      products_found: 'Products found',
      items: 'Items',
      view: 'View',
      change_to_grid_view: 'Change to grid view',
      change_to_list_view: 'Change to list view'
    },
    filters_sidebar: {
      done: 'Done',
      clear_all: 'Clear all',
      filters: 'Filters'
    },
    header_navigation: {
      all: 'All'
    },
    locale_selector: {
      change_locale: 'Change locale',
      change_currency: 'Change currency'
    },
    login_modal: {
      login: 'Login',
      forgotten_password: 'Forgotten password',
      no_account: 'Don\'t have an account yet?',
      register_today: 'Register today',
      forgot_password_confirmation: 'Thanks! If there is an account registered with the {0} email, you will find message with a password reset link in your inbox.',
      forgot_password: 'If you can’t remember your password, you can reset it.',
      forgot_password_modal_email: 'Email you are using to sign in:',
      reset_password: 'Reset password',
      thank_you_inbox: 'If the message is not arriving in your inbox, try another email address you might’ve used to register.',
      create_an_account: 'Create an account',
      or: 'or',
      login_in_to_your_account: 'login in to your account',
      email_modal_label: 'Your email',
      password_modal_label: 'Password',
      remember_me_modal_label: 'Remember me',
      first_name_modal_label: 'First name',
      last_name_modal_label: 'Last name',
      create_an_account_modal_label: 'I want to create an account',
      bar_title_screen_login: 'Sign in',
      bar_title_screen_register: 'Register',
      bar_title_screen_reset_password: 'Reset Password'
    },
    newsletter_modal: {
      subscribe_to_newsletter: 'Subscribe to newsletter',
      subscribe_to_newsletter_modal_content: 'After signing up for the newsletter, you will receive special offers and messages from VSF via email. We will not sell or distribute your email to any third party at any time. Please see our {0}.',
      email_address: 'Email address',
      i_confirm_subscription: 'I confirm subscription',
      you_can_unsubscribe_at_any_time: 'You can unsubscribe at any time',
      privacy_policy: 'Privacy Policy',
      show_more: 'show more',
      hide: 'hide'
    },
    search_results: {
      search_results: 'Search results',
      categories: 'Categories',
      product_suggestions: 'Product suggestions',
      cancel: 'Cancel',
      we_havent_found_any_results_for_given_phrase: 'We haven’t found any results for given phrase',
      you_havent_searched_for_items_yet: 'You haven’t searched for items yet.',
      lets_start_now_we_will_help_you: 'Let’s start now – we’ll help you.',
      go_back: 'Go back',
      alt_error: 'error'
    },
    top_bar: {
      help_and_faqs: 'Help & FAQs',
      download: 'Download our application.',
      find_out_more: 'Find out more'
    },
    wishlist_sidebar: {
      start_shopping: 'Start shopping',
      sidebar_title: 'My Wishlist',
      aria_label_sidebar_close_button: 'Wishlist sidebar close button',
      empty_wishlist_title: 'Your wishlist is empty',
      empty_wishlist_description: 'You haven\'t added any items to your wishlist yet. Add some products to save them for later.'
    }
  }
};

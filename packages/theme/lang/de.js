export default {
  shared: {
    form: {
      email: 'Email',
      first_name: 'Vorname',
      last_name: 'Familienname, Nachname',
      street: 'Straßenname',
      apartment: 'Haus-/Wohnungsnummer',
      city: 'Familienname, Nachname',
      state: 'Staat/Provinz',
      country: 'Land',
      postal_code: 'Postleitzahl',
      phone_number: 'Telefonnummer'
    }
  },
  composables: {
    facet_getters: {
      sort_price_ascending: 'Preis steigend',
      sort_price_descending: 'Preis absteigend',
      sort_updated_at_ascending: 'Aktualisiert bei aufsteigend',
      sort_updated_at_descending: 'Aktualisiert beim Absteigen'
    }
  },
  pages: {
    checkout: {
      billing: {
        billing_heading: 'Abrechnung',
        first_name_label: '@:shared.form.first_name',
        last_name_label: '@:shared.form.last_name',
        street_label: '@:shared.form.street',
        apartment_label: '@:shared.form.apartment',
        city_label: '@:shared.form.city',
        state_label: '@:shared.form.state',
        country_label: '@:shared.form.country',
        postal_code_label: '@:shared.form.postal_code',
        phone_number_label: '@:shared.form.phone_number',
        button_go_back_label: 'Geh zurück',
        button_continue_to_payment_label: 'Weiter zur Zahlung'
      },
      payment: {
        payment_heading: 'Zahlung',
        item: 'Artikel',
        i_agree_to: 'Ich stimme zu',
        terms_and_conditions: 'Geschäftsbedingungen',
        go_back: 'Geh zurück',
        make_an_order: 'Eine Bestellung aufgeben',
        table_headers: [
          { key: 'description', value: 'Beschreibung' },
          { key: 'size', value: 'Größe' },
          { key: 'color', value: 'Farbe' },
          { key: 'quantity', value: 'Menge' },
          { key: 'amount', value: 'Menge' }
        ]
      },
      shipping: {
        shipping_heading: 'Versand',
        select_shipping_method: 'Versandart auswählen',
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
        shipping_to_billing_label: 'Verwenden Sie dieselben Details für die Abrechnung',
        button_go_back_label: 'Geh zurück',
        button_continue_to_payment_label: 'Weiter zur Zahlung'
      },
      thank_you: {
        order_no: 'Best.-Nr.',
        successful_placed_order: 'Sie haben die Bestellung erfolgreich aufgegeben. Sie können den Status Ihrer Bestellung überprüfen, indem Sie unsere Lieferstatusfunktion verwenden. Sie erhalten eine Bestellbestätigungs-E-Mail mit Details zu Ihrer Bestellung und einem Link, um den Fortschritt zu verfolgen.',
        allow_order_notifications: 'Bestellbenachrichtigungen zulassen',
        info_after_order: 'Sie können sich mit der zuvor definierten E-Mail-Adresse und dem Passwort bei Ihrem Konto anmelden. In Ihrem Konto können Sie Ihre Profildaten bearbeiten, den Transaktionsverlauf einsehen und das Newsletter-Abonnement bearbeiten.',
        feedback: 'Ihr Feedback ist uns wichtig. Lassen Sie uns wissen, was wir verbessern könnten.',
        send_my_feedback: 'Senden Sie mein Feedback',
        go_back_to_shop: 'Gehen Sie zurück zum Geschäft',
        thank_you_banner_title: 'Vielen Dank für Ihren Auftrag!',
        your_purchase_title: 'Ihr Einkauf',
        questions_contacts_title: 'Primäre Ansprechpartner für alle Fragen',
        your_account_title: 'Ihr Konto',
        what_can_we_improve: 'Was können wir verbessern'
      }
    },
    my_account: {
      tab_title_personal_data: 'Persönliche Daten',
      tab_title_password_change: 'Passwortänderung',
      content_page_title_my_account: 'Mein Konto',
      content_category_title_personal_details: 'Persönliche Daten',
      content_page_title_my_profile: 'Mein Profil',
      content_page_title_saved_addresses: 'Gespeicherte Adressen',
      content_category_title_order_details: 'Bestelldetails',
      content_page_title_order_history: 'Bestellverlauf',
      content_page_title_order_details: 'Bestelldetails',
      content_page_title_log_out: 'Ausloggen',
      my_profile: {
        tab_title_personal_data: 'persönliche Daten',
        tab_title_password_change: 'Passwortänderung',
        feel_free_to_edit: 'Fühlen Sie sich frei, Ihre Details unten zu bearbeiten, damit Ihr Konto immer auf dem neuesten Stand ist',
        use_your_personal_data: 'Bei Brand name legen wir großen Wert auf Datenschutzfragen und verpflichten uns, die personenbezogenen Daten unserer Nutzer zu schützen. Erfahren Sie mehr darüber, wie wir Ihre personenbezogenen Daten pflegen und verwenden im',
        privacy_policy: 'Datenschutz-Bestimmungen',
        change_password_your_account: 'Wenn Sie das Passwort für den Zugriff auf Ihr Konto ändern möchten, geben Sie die folgenden Informationen ein'
      },
      order_history: {
        details_and_status_orders: 'Überprüfen Sie die Details und den Status Ihrer Bestellungen im Online-Shop. Sie können Ihre Bestellung auch stornieren oder eine Rücksendung anfordern.',
        you_currently_have_no_orders: 'Sie haben derzeit keine Bestellungen',
        start_shopping: 'Beginn mit dem Einkauf',
        view_details: 'Einzelheiten anzeigen',
        total_orders_label: 'Bestellungen insgesamt - {totalOrders}',
        table_headers: [
          { key: 'order_id', value: 'Auftragsnummer' },
          { key: 'payment_date', value: 'Zahlungsdatum' },
          { key: 'amount', value: 'Menge' },
          { key: 'status', value: 'Status' }
        ]
      },
      order_details: {
        tab_title: 'Bestelldetails - {orderId}',
        table_header_order_id: 'Auftragsnummer',
        table_header_payment_date: 'Zahlungsdatum',
        table_header_status: 'Status',
        table_header_total: 'Gesamt',
        button_show_all_orders_label: 'Alle Bestellungen anzeigen',
        products_table_headers: [
          { key: 'products_name', value: 'Name' },
          { key: 'products_quantity', value: 'Menge' },
          { key: 'products_price', value: 'Preis' }
        ]
      },
      saved_addresses_details: {
        tab_title_saved_addresses: 'Gespeicherte Adressen',
        contact_details_updated: 'Halten Sie Ihre Adressen und Kontaktdaten aktuell.',
        manage_saved_addresses: 'Verwalten Sie alle gewünschten gespeicherten Adressen (Arbeitsplatz, Privatadresse...). Auf diese Weise müssen Sie nicht bei jeder Bestellung manuell eine Adresse eingeben.',
        change: 'Ändern',
        delete: 'Löschen',
        add_new_address: 'Neue Adresse hinzufügen',
        tab_title_new_address: 'Adresse hinzufügen',
        tab_title_old_address: 'Adresse aktualisieren'
      }
    },
    category: {
      categories: 'Kategorien',
      save_for_later: 'Speichern Sie für später',
      remove_from_wishlist: 'Von der Wunschliste entfernen',
      show_on_page: 'Auf Seite zeigen'
    },
    home: {
      see_all: 'Alles sehen',
      cta_subscribe_title: 'Abonnieren',
      cta_subscribe_button_label: 'Newsletter abonnieren',
      cta_subscribe_description: 'Informieren Sie sich über bevorstehende Verkäufe und Veranstaltungen. Erhalten Sie Geschenke und Sonderangebote!',
      similar_products_heading: 'Passen Sie damit zusammen',
      aria_label_carousel_arrow_prev: 'vorh',
      aria_label_carousel_arrow_next: 'nächste'
    },
    product: {
      size_select_label: 'Größe',
      button_read_all_reviews_label: 'Lesen Sie alle Bewertungen',
      button_size_guide_label: 'Größentabelle',
      color_label: 'Farbe',
      tab_title_description: 'Beschreibung',
      tab_title_read_reviews: 'Bewertungen lesen',
      tab_title_properties: 'Eigenschaften',
      related_products_title: 'Passen Sie es an'
    },
    reset_password: {
      reset_password: 'Passwort zurücksetzen',
      password: 'Passwort',
      repeat_password: 'Passwort wiederholen',
      save_password: 'Passwort speichern',
      password_changed: 'Passwort geändert',
      back_to_home: 'Zurück nach Hause'
    }
  },
  components: {
    checkout: {
      cart_preview: {
        order_summary: 'Bestellübersicht',
        products: 'Produkte',
        subtotal: 'Zwischensumme',
        shipping: 'Versand',
        total: 'Gesamt',
        enter_promo_code: 'Aktionscode eingeben',
        apply: 'Anwenden'
      },
      user_billing_address: {
        set_as_default_address: 'Verwenden Sie diese Adresse als meine Standardadresse.'
      },
      user_shipping_address: {
        set_as_default_address: 'Verwenden Sie diese Adresse als meine Standardadresse.'
      },
      vsf_shipping_provider: {
        continue_to_billing: 'Weiter zur Abrechnung'
      }
    },
    my_account: {
      password_reset_form: {
        new_password_label: 'Neues Kennwort',
        confirm_password_label: 'Bestätige neues Passwort'
      },
      profile_update_form: {
        table_data_email: 'Email',
        table_data_store_credits: 'Guthaben speichern',
        table_data_shipping_to: 'Versand an {firstName} {lastName}',
        table_data_shipping: 'Versand',
        button_manage_saved_addresses_label: 'Gespeicherte Adressen verwalten',
        button_show_recent_orders_label: 'Letzte Bestellungen anzeigen'
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
        set_as_default_label: 'Als Standard einstellen',
        button_add_address_label: 'Fügen Sie die Adresse hinzu',
        button_update_address_label: 'Aktualisieren Sie die Adresse'
      }
    },
    app_footer: {
      about_us: {
        title: 'Über uns',
        items: ['Wer wir sind', 'Qualität im Detail', 'Kundenbewertungen']
      },
      departments: {
        title: 'Abteilungen',
        items: ['Damenmode', 'Herrenmode', 'Kinderkleidung', 'Heim']
      },
      help: {
        title: 'Hilfe',
        items: ['Kundendienst', 'Größentabelle', 'Kontaktiere uns']
      },
      payment_and_delivery: {
        title: 'Zahlung & Lieferung',
        items: ['Einkaufsbedingungen', 'Garantie']
      },
      social: {
        title: 'Sozial',
        items: ['Facebook', 'Pinterest', 'Google', 'zwitschern', 'Youtube']
      }
    },
    app_header: {
      search_for_items: 'Artikel suchen',
      aria_label_open_account_button: 'Schaltfläche Konto eröffnen',
      aria_label_toggle_wishlist_sidebar_button: 'Seitenleiste der Wunschliste umschalten',
      aria_label_toggle_cart_sidebar_button: 'Einkaufswagen-Seitenleiste umschalten',
      aria_label_search_bar: 'Suche',
      aria_label_close_search_button: 'Suche schließen',
      aria_label_open_search_button: 'Suche öffnen',
      alt_header_logo: 'Vue Storefront Next'
    },
    bottom_navigation: {
      label_home_icon: 'Heim',
      label_menu_icon: 'Speisekarte',
      label_wishlist_icon: 'Wunschzettel',
      label_account_icon: 'Konto',
      label_basket_icon: 'Korb',
      aria_label_add_to_cart: 'Aria-Label in den Warenkorb legen'
    },
    cart_sidebar: {
      product_already_in_your_wishlist: 'Produkt bereits in Ihrer Wunschliste',
      go_to_checkout: 'Zum Checkout gehen',
      go_back_shopping: 'Gehen Sie wieder einkaufen',
      my_cart: 'Mein Warenkorb',
      total_items: 'Gesamtanzahl',
      your_cart_is_empty_title: 'Ihr Warenkorb ist leer',
      your_cart_is_empty_description: 'Sieht so aus, als hätten Sie der Tasche noch keine Artikel hinzugefügt. Beginnen Sie mit dem Einkaufen, um es auszufüllen.',
      subtotal_price: 'Zwischensumme Preis'
    },
    category_page_header: {
      filters: 'Filter',
      sort_by: 'Sortieren nach',
      select_sorting: 'Sortierung auswählen',
      products_found: 'Produkte gefunden',
      items: 'Produkte',
      view: 'Sicht',
      change_to_grid_view: 'Wechseln Sie in die Rasteransicht',
      change_to_list_view: 'Zur Listenansicht wechseln'
    },
    filters_sidebar: {
      done: 'Erledigt',
      clear_all: 'Alles löschen',
      filters: 'Filter'
    },
    header_navigation: {
      all: 'Alles'
    },
    locale_selector: {
      change_locale: 'Gebietsschema ändern',
      change_currency: 'Währung ändern'
    },
    login_modal: {
      login: 'Anmeldung',
      forgotten_password: 'Passwort vergessen',
      no_account: 'Sie haben noch kein Konto?',
      register_today: 'Registrieren Sie sich heute',
      forgot_password_confirmation: 'Vielen Dank! Wenn ein Konto mit der E-Mail-Adresse {0} registriert ist, finden Sie in Ihrem Posteingang eine Nachricht mit einem Link zum Zurücksetzen des Passworts.',
      forgot_password: 'Wenn Sie Ihr Passwort vergessen haben, können Sie es zurücksetzen.',
      forgot_password_modal_email: 'E-Mail, mit der Sie sich anmelden:',
      reset_password: 'Passwort zurücksetzen',
      thank_you_inbox: 'Wenn die Nachricht nicht in Ihrem Posteingang ankommt, versuchen Sie es mit einer anderen E-Mail-Adresse, die Sie möglicherweise zur Registrierung verwendet haben.',
      create_an_account: 'Ein Konto erstellen',
      or: 'oder',
      login_in_to_your_account: 'Melden Sie sich bei Ihrem Konto an',
      email_modal_label: 'Deine E-Mail',
      password_modal_label: 'Passwort',
      remember_me_modal_label: 'Mich erinnern',
      first_name_modal_label: 'Vorname',
      last_name_modal_label: 'Familienname, Nachname',
      create_an_account_modal_label: 'Ich möchte ein Konto erstellen',
      bar_title_screen_login: 'Anmelden',
      bar_title_screen_register: 'Konto erstellen',
      bar_title_screen_reset_password: 'Passwort zurücksetzen'
    },
    newsletter_modal: {
      subscribe_to_newsletter: 'Newsletter abonnieren',
      subscribe_to_newsletter_modal_content: 'Nachdem Sie sich für den Newsletter angemeldet haben, erhalten Sie Sonderangebote und Nachrichten von VSF per E-Mail. Wir werden Ihre E-Mail zu keinem Zeitpunkt an Dritte verkaufen oder verteilen. Bitte sehen Sie sich unser {0} an.',
      email_address: 'E-Mail-Addresse',
      i_confirm_subscription: 'Ich bestätige das Abonnement',
      you_can_unsubscribe_at_any_time: 'Sie können sich jederzeit abmelden',
      privacy_policy: 'Datenschutz-Bestimmungen',
      show_more: 'Zeig mehr',
      hide: 'verstecken'
    },
    search_results: {
      search_results: 'Suchergebnisse',
      categories: 'Kategorien',
      product_suggestions: 'Produktvorschläge',
      cancel: 'Absagen',
      we_havent_found_any_results_for_given_phrase: 'Wir haben keine Ergebnisse für den angegebenen Ausdruck gefunden',
      you_havent_searched_for_items_yet: 'Sie haben noch nicht nach Artikeln gesucht.',
      lets_start_now_we_will_help_you: 'Fangen wir jetzt an – wir helfen Ihnen.',
      go_back: 'Geh zurück',
      alt_error: 'Error'
    },
    top_bar: {
      help_and_faqs: 'Hilfe und häufig gestellte Fragen',
      download: 'Laden Sie unsere Anwendung herunter.',
      find_out_more: 'Finde mehr heraus'
    },
    wishlist_sidebar: {
      start_shopping: 'Beginn mit dem Einkauf',
      sidebar_title: 'Meine Wunschliste',
      aria_label_sidebar_close_button: 'Schaltfläche zum Schließen der Seitenleiste der Wunschliste',
      empty_wishlist_title: 'Deine Wunschliste ist leer',
      empty_wishlist_description: 'Sie haben Ihrer Wunschliste noch keine Artikel hinzugefügt. Fügen Sie einige Produkte hinzu, um sie für später zu speichern.'
    }
  }
};

odoo.define('sk_pos.SkSampleButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');
    const { useListener } = require("@web/core/utils/hooks");

    class SkSampleButton extends PosComponent {
        setup() {
            super.setup();
            useListener("click", this.onClickSKSampleButton);
        }



        async onClickSKSampleButton(){


// Samples for RPC (Remote Procedure Calls from POS ******************************************************

            var result = await this.rpc({
                'model': 'res.lang',
                'method': 'search_read',
                'args': [[], ['id', 'name', 'code', 'direction']]
            });

            var result_from_controller = await this.rpc({
                route: '/pos/rpc/example/orders',
                params: {}
            });

            var active_langs = await this.rpc({
                route: '/pos/rpc/example/lang',
                params: {}
            });

            // console.log("It has a lot of methods to explore TODO", this.env.pos);

            var multi_lang_list = []
            active_langs.forEach(function(language){
                multi_lang_list.push({
                    'id': language.id,
                    'label': language.name,
                    'item': language
                });
            });

            var {confirmed, payload: selectedOption} = await this.showPopup('SelectionPopup', {
                title: this.env._t('Active Languages'),
                list: multi_lang_list
            });


            // Display using ForEach
            result_from_controller.forEach(function(orders){
                console.log("Sale Orders from Controller", orders)
            });

// End Of Samples for RPC (Remote Procedure Calls from POS ***********************************************

// Samples for Popups In odoo POS ************************************************************************
//            POPUPS in POS

             // ErrorPopup
/*
            this.showPopup('ErrorPopup', {
                title: 'Sample Button Error Title',
                body: 'This is a Custom Error Message',
            });
*/

            // ConfirmPopup
/*
            const { confirmed } = await this.showPopup('ConfirmPopup', {
                title: 'Sample Button Confirm Title',
                body: 'This is a Custom Confirm Message',
                confirmText: 'Yes Go Ahead',
                cancelText: 'No.. !',
            });


            if (confirmed){
                console.log("Yes Button Clicked and your logic goes here");
            } else {
                console.log("Cancel button clicked and Your logic goes here");
            }
*/

        // OfflineErrorPopup

/*
        this.showPopup('OfflineErrorPopup', {
            title: 'Sample Button Offline Error Title',
            body: 'This is a Custom Offline Error Message'
        });
*/

        // SelectionPopup

/*
        const { confirmed, payload: selectedOption } = await this.showPopup('SelectionPopup', {
            title: 'Are you sure you need to continue with the Selection Popup ?',
            list: [
                {'id': 0, 'label': 'Yes', 'item': "Selected Yes Object.. !"},
                {'id': 1, 'label': 'No.. Not Now', 'item': "Selected No Object.. !"},
                {'id': 2, 'label': 'Not Sure', 'item': "Selected Not Sure Object.. !"},
            ]
        });

        console.log("Confirmed", confirmed);
        console.log("Selected Option", selectedOption);
*/

        // ClosePosPopup

/*
        const info = await this.env.pos.getClosePosInfo();
        this.showPopup('ClosePosPopup', {
            info: info,
            keepBehind: true
        });
*/
// End of Samples for Popups in Odoo POS *****************************************************************


        }  // End of onClickSKSampleButton method

    }  // End of SkSampleButton Class



    SkSampleButton.template = 'sk_pos.SkSampleButton';

    ProductScreen.addControlButton({
        component: SkSampleButton,
        position: ['before', 'OrderlineCustomerNoteButton'],
    });

    Registries.Component.add(SkSampleButton);

    return SkSampleButton;
});
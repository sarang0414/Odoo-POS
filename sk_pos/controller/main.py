from odoo import http


class RpcPosExample(http.Controller):

    @http.route('/pos/rpc/example/orders', auth='user', type='json')
    def pos_example(self, **kwargs):
        # Returns a List of Dictionary that Contains Orders and their Invoices
        data = []
        so_recs = http.request.env['sale.order'].search([('state', 'in', ('sale', 'done'))])
        for order in so_recs:
            vals = {'order': order.name, 'invoices': []}
            if order.invoice_ids:
                for inv in order.invoice_ids:
                    vals['invoices'].append(inv.name)
            data.append(vals)
        return data

    @http.route('/pos/rpc/example/lang', auth='user', type='json')
    def get_pos_active_langs(self):
        langs = http.request.env['res.lang'].search_read([])
        return langs
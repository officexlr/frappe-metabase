// Copyright (c) 2019, Officexlr Business Solutions Pvt Ltd. and Contributors
// License: MIT. See license.txt

frappe.pages['metabase-dashboard'].on_page_load = function(wrapper) {
	frappe.metabase = new frappe.Metabase(wrapper)
}

frappe.Metabase = Class.extend({
	init: function (parent) {
		frappe.ui.make_app_page({
			parent: parent,
			title: 'Dashboard',
			single_column: true
		})
		
		this.parent = parent
		this.page = this.parent.page
		this.pageMain = $(parent.page.main);
		// add resizer
		const resizer = `<script id="resizer" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.0.1/iframeResizer.js"></script>`
		$(resizer).appendTo(this.pageMain)
		this.make()
	},
	make: function () {
		let me = this
		this.page.add_field({
			fieldtype: "Link", 
			fieldname: "dashboard", 
			options: "Dashboard",
			label: __("Dashboard"), 
			reqd:1,
			change: function() {
				me.get_dashboard()
			}
		})	
	},
	get_dashboard: function(){
		let me = this
		frappe.call({
			method: "metabase.metabase.doctype.dashboard.dashboard.get_signed_url",
			args: {
				filters: {
					dashboard_id : this.page.fields_dict.dashboard.value
				},
			},
			callback: function (r) {
				if($("#metabase").length){
					$("#metabase").remove()
				}
				const mbiFrame = `
				<iframe
					id="metabase"
					src="${JSON.parse(r.message).iframeURL}"
					width=100%
					frameborder="0"
					onload="iFrameResize({}, this)"
					allowtransparency>
				</iframe>`
				$(mbiFrame).appendTo(me.pageMain)
			}
		})
	}
})
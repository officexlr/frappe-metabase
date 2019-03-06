frappe.pages['dashboard'].on_page_load = function(wrapper) {
	frappe.dashboard = new frappe.Dashboard(wrapper)
}

frappe.Dashboard = Class.extend({
	init: function (parent) {
		frappe.ui.make_app_page({
			parent: parent,
			title: 'Sales Dashboard',
			single_column: true
		})
		
		this.parent = parent
		this.page = this.parent.page
		this.make()
		$(frappe.render_template('dashboard',{dashboardUrl:"https://dashboard.officexlr.com/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsiZGF0ZV9yYW5nZSI6IjIwMTktMDMtMDV-MjAxOS0wMy0wNSIsImxlYWRfb3duZXIiOiIifSwicmVzb3VyY2UiOnsiZGFzaGJvYXJkIjozNn19.61ZLJZgWT6XkYb4K-BPY1jzqs8mS_CkMpyPJ_lbH9Rk#bordered=false&titled=false"})).appendTo(this.page.body)
	},
	make: function () {
		let me = this
		
		this.page.add_field({
			fieldname: 'from_date',
			label: __("From Date"),
			fieldtype: 'Date',
			default: frappe.user_defaults.year_start_date,
			change: function() {
				me.get_dashboard()
			}
		})
		
		this.page.add_field({
			fieldname: 'to_date',
			label: __("To Date"),
			fieldtype: 'Date',
			default: frappe.datetime.nowdate(),
			change: function() {
				me.get_dashboard()
			}
		})		
		
		this.page.add_field({
			fieldtype: "Link", 
			fieldname: "lead_owner", 
			options: "User",
			label: __("Lead Owner"), 
			change: function() {
				me.get_dashboard()
			}
		})	
	},
	get_dashboard: function(){
		frappe.call({
			method: "metabase.metabase.doctype.dashboard.dashboard.get_signed_url",
			args: {
				filters: {
					date_range : this.page.fields_dict.from_date.value+"~"+this.page.fields_dict.to_date.value
				},
			},
			callback: function (r) {
				if($("#metabase").length){
					$("#metabase").attr('src', r.message)
				}
			}
		})
	}
})
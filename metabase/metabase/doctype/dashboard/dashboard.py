# -*- coding: utf-8 -*-
# Copyright (c) 2019, Officexlr and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json
from frappe import _
from frappe.model.document import Document

class Dashboard(Document):
	pass

@frappe.whitelist()
def get_signed_url(filters=None):
	if filters:
		filters = frappe._dict(json.loads(filters))

	doc = frappe.get_single("Metabase Settings")
	metabase_dashboard_id = frappe.db.get_value("Dashboard", filters.dashboard_id, "metabase_dashboard_id")
	print("-"*10)
	print(metabase_dashboard_id)
	print("-"*10)
	resp = doc.get_signed_url(metabase_dashboard_id)
	return resp
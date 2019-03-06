# -*- coding: utf-8 -*-
# Copyright (c) 2019, Officexlr and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class Dashboard(Document):
	pass

@frappe.whitelist()
def get_signed_url(filters=None):
	import jwt
	import json
	METABASE_SITE_URL = "https://dashboard.officexlr.com"
	METABASE_SECRET_KEY = "6be20585e50ef96de1096b86b8bcbcb2a71f9a2433b4a8d5ffa9da2147d2c3d2"
	filters_payload = json.loads(filters)
	
	payload = {
		"resource": {"dashboard": 36},
		"params": filters_payload
	}

	token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")
	iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token.decode("utf8") + "#bordered=false&titled=false"
	return iframeUrl
# -*- coding: utf-8 -*-
# Copyright (c) 2019, Officexlr Business Solutions Pvt Ltd. and Contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import jwt, json, time

class MetabaseSettings(Document):
	def get_signed_url(self, dashboard_id):
		METABASE_SITE_URL = self.metabase_site
		METABASE_SECRET_KEY = self.get_password(fieldname="metabase_secret_key")
		payload = {
			"resource": {"dashboard": dashboard_id},
 			"params": {},
			"exp": round(time.time()) + (60 * 10) # 10 minute expiration
		}

		token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")
		iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token.decode("utf8") + "#bordered=false&titled=false"
		return json.dumps({"iframeURL": iframeUrl})

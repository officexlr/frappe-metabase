# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Metabase",
			"color": "grey",
			"icon": "octicon octicon-dashboard",
			"type": "page",
			"link": "metabase-dashboard",
			"label": _("Metabase Dashboard")
		}
	]

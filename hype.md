---
layout: page
key: hype
title: Hype
---

{% for video in site.data.sitetext.hype %}
  <iframe src="{{ video.url }}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  {% if video.text %} {{ video.text }} {% endif %}
{% endfor %}

# ChoccyStatus

A nice, customizable, open-source, JSON based status page for static sites. [Check out this demo.](https://online.dilanxd.com/ChoccyStatus/test/choccytest.html)

<p align="center">
<img src="ChoccyStatusImage.png" width="440" height="423">
</p>

## Setup Guide

It's super easy to get this working. Make a new HTML page on your website using the [starter HTML](starter/status.html).

Change the page title to whatever you want, and then change the JSON file path to the path of your status JSON file.

The actual updated status information will be read from a JSON file. Get started with the [starter JSON](starter/status.json).

### Notices

You can put notices at the top of your status page in the `notices` section of the file.

Add these to the JSON list:
```
{
    "title": "Notice Title",
    "color": "blue",
    "text": "Example notice message!"
}
```
Any color can be used from the `notice_colors` section of `settings`. Only red and blue exist by default but you can add more (check out how they're done in the starter JSON).


### Blocks

You can add blocks of services by adding these to the JSON list:
```
{
    "section_name": "Section Title",
    "content": [
        {
            "name": "Server 1",
            "status": "Operational"
        },
        {
            "name": "Server 2",
            "status": "Under Maintenance",
            "description": "This server is currently under scheduled maintenance. Check back soon!"
        }
    ]
}
```
Add as many services you want to the `content` list. They'll need a name and status, and optionally a description if you want some extra text there. The color of the status will match its color assignment in the `default_color_map` section of a `settings`. You can add more blocks to the `blocks` list to add more sections.

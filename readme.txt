=== Embed Mixcloud Advanced ===
Contributors: Veliky
Tags: mixcloud, embed, gutenberg, widget, shortcode
Requires at least: 5.2
Tested up to: 5.7
Requires PHP: 5.6
Stable tag: 1.0.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

All in one solution for embedding content from mixcloud.com. 2 Shortcodes + 2 Widgets + 2 Gutenberg blocks.

== Description ==

**Embed Mixcloud Advanced** - is a universal plugin for embedding content from mixcloud.com on Wordpress sites.
It gives you simple and flexible integration tools, complete with a unique feature to play a short preview for each show.

== 2 WIDGETS + 2 GUTENBERG BLOCKS ==

🎵 **Mixcloud Advanced**
For embedding single shows.

🎶 **Mixcloud Advanced - List**
For embedding multiple shows from one channel with offset, amount, and time settings.

== 2 SHORTCODES ==

🎵 **[vema_show]** 🎵

* **url (required)**
* **widget_type** (optional)
  - picture
  - classic - DEFAULT
  - noArtwork
  - covered
  - mini
  - miniNoArtwork
* **theme** (optional) [dark|light] DEFAULT: dark
* **autoplay** (optional) [on|off] DEFAULT: off

Minimum version:

`[vema_show url="https://www.mixcloud.com/OliverHeldens/oliver-heldens-heldeep-radio-349/"]`

Main attributes:

`[vema_show url="https://www.mixcloud.com/OliverHeldens/oliver-heldens-heldeep-radio-349/" widget_type="mini" theme="light" autoplay=1]`

Additional preview attributes:

* **preview_url** (optional)
  URL of audio preview file from mixcloud.com
* **preview** (optional) [on|off] DEFAULT: off
  Show / hide preview button
* **preview_align** (optional) [left|center|right] DEFAULT: right
  Aligning the preview button

Main attributes + preview attributes (All attributes):

`[vema_show url="https://www.mixcloud.com/OliverHeldens/oliver-heldens-heldeep-radio-349/" widget_type="mini" theme="light" autoplay=1 preview=1 preview_url="https://audiocdn7.mixcloud.com/previews/3/1/4/9/057b-8eb1-42d5-bea6-d11338a80be7.mp3" preview_align="center"]`

🎶 **[vema_list]** 🎶

* **channel (required)** - slug or URL
* **offset** (optional) DEFAULT: 0
* **limit** (optional) DEFAULT: 5
* **since** (optional) Date, example: 2020-12-01
* **until** (optional) Date, example: 2020-12-31
* **widget_type** (optional)
  - picture
  - classic - DEFAULT
  - noArtwork
  - covered
  - mini
  - miniNoArtwork
* **theme** (optional) [dark|light] DEFAULT: dark
* **autoplay** (optional) [on|off] DEFAULT: off

Minimum version:

`[vema_list channel="-djarchiebold"]`

All attributes:

`[vema_list channel="https://www.mixcloud.com/-djarchiebold/" offset=1 limit=10 since="2020-12-01" until="2020-12-31" widget_type="mini" theme="light" autoplay=1]`

= Demo =

- [Top 7 Deep House Sets](https://datcoder.com/top-7-deep-house-sets/)
- [Top 7 Future House Sets](https://datcoder.com/top-7-future-house-sets/)

== Screenshots ==

1. Add block
2. Set the show URL
3. 6 Types Of Widget
4. Dark / Light Scheme
5. Mixcloud Preview
6. Block "Mixcloud Advanced - List"

== Changelog ==

= 1.0.2 =
* [Fix] Compatibility

= 1.0.1 =
* [Fix] Missed files

= 1.0.0 =
* [FEATURE] 2 new shortcodes
* [FEATURE] 2 new widgets
* [COMPATIBILITY] Tested up to WordPress 5.7
* [CHANGE] The key of the first parameter is changed from "url" to "channel" in the Gutenberg block "Mixcloud Advanced - List". This parameter can take the value of both URL and channel slug.
* [FIX] Rest API work with any type of permalinks

= 0.2.5 =
* [Fix] New block name

= 0.2.4 =
* [Fix] Readme, plugin description

= 0.2.3 =
* [Fix] Readme, plugin description

= 0.2.2 =
* [Fix] Missed frontend files

= 0.2.1 =
* [Fix] Missed PHP file

= 0.2.0 =
* [COMPATIBILITY] Tested up to WordPress 5.6.
* [IMPROVEMENT] New block "Mixcloud Advanced - List". Allows to import multiple shows from a channel.

= 0.1.5 =
* SPA compatibility

= 0.1.4 =
* Fix warnings, tested up to 5.5

= 0.1.3 =
* Fix translations
* Replace screenshots

= 0.1.2 =
* Fix backend translations

= 0.1.1 =
* Fixed localization issues

= 0.1.0 =
* Make plugin ready to localize
* Add russian localization
* Fixed the problem with preview button animation when preview starts again
* Grammar changes

= 0.0.1 =
* The basic functionality is done.

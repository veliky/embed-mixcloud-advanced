# Embed Mixcloud Advanced

**Embed Mixcloud Advanced** - is a universal plugin for embedding content from mixcloud.com on Wordpress sites.
It gives you simple and flexible integration tools, complete with a unique feature to play a short preview for each show.

## 2 WIDGETS + 2 GUTENBERG BLOCKS

🎵 **Mixcloud Advanced**  
For embedding single shows.

🎶 **Mixcloud Advanced - List**  
For embedding multiple shows from one channel with offset, amount, and time settings.

## 2 SHORTCODES

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

### Demo 

- [Top 7 Deep House Sets](https://datcoder.com/top-7-deep-house-sets/)
- [Top 7 Future House Sets](https://datcoder.com/top-7-future-house-sets/)

### Details

 * Version:           1.0.2
 * Author:            Evhen Veliky
 * Author URI:        https://datcoder.com
 * Plugin URI:        https://datcoder.com/embed-mixcloud-advanced
 * Requires at least: 5.2
 * Tested up to:      5.7
 * Requires PHP:      5.6
 * Domain Path:       /languages
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
# [Foam ![foam icon](./icons/icon38.png)](https://github.com/nobe4/foam)

> Fear of another miss.
> No more !

If you are like me, you wait constantly for the update of a particular webpage.
But it's boring to have to refresh the page every 10 seconds to be sure to have
the information as soon as possible.

Introducing **Foam**, the Chrome extension that checks this for you.

# How does it work?

The extension has the following workflow:

1. Fetch the desired webpage
2. Parse the HTML to extract the content
3. If the content has changed, notify!
4. Wait and go to **1.**

# Installation

The extension is currently under development, so it has no official release on
the Chrome store. To manually install it:

1. Download the [zip of the extension](https://github.com/nobe4/foam/archive/master.zip)
2. Extract it on your computer
3. Go to `chrome://extensions/`
4. Check that you are in `Developer mode`
5. Click on `Load unpacked extension...`
6. Enjoy!

# Configuration

You can access the configuration page by clicking on the icon in the extension
bar, or from the extension page (`Options`).

The configuration page has the following options:

- `status`
  - `running` or `stopped`
- `Config`
  - `Save`: Save in memory the current state of the option page, will override
  any existing configuration.
  - `New`: Add a configuration line.
  - `Reload`: Load the saved configuration from memory and display it in the
  page. Will override any unsaved configuration.
- `Runtime`
  - `Stop`: Stop the exectution, the status will become 'stopped'.
  - `Start`: Start the exectution, the status will become 'running'.
  - `Restart`: Stop and Start the exectution, the status will become 'running'.

Note that the new configuration will not be applied when you click `Save`, you
have to manually restart.

## Examples:

| title | url | selector | timeout |
| -- | -- | -- | -- |
| Reddit new posts every 10 seconds| `https://www.reddit.com/r/all/new/`| `div.entry > p.title > a` | 10 |
| Stackoverflow new question every minute| `https://www.reddit.com/r/all/new/`| `div.summary > h3 > a` | 10 |

## Note on the selectors

If the content you want to track is the first one in a list, just choose a
selector that will select every element in the list. When parsing the HTML,
only the first element matching the selector will be chosen.

# Question, Bug, Improvement

I would be glad to have any feedback on the extension. Whether positive or
negative. Considere openning [an issue](https://github.com/nobe4/foam/issues/new) or [a
pull request](https://github.com/nobe4/foam/compare).

# License

[MIT](https://github.com/nobe4/foam/blob/master/LICENSE)

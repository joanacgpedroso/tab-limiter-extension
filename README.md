# Tab Limiter Extension

Tab Limiter is a Firefox extension that limits the number of tabs that can be opened in a window.

![Extension blocking a 4th tab from being opened](others/images/limiting_tabs.png?raw=true "Tab Limiter Extension for Firefox")

## Why

How many times have you been browsing the web when you find a link you're curious about? Instead of going to another page to read it, you open a new tab and continue on the same page. As you keep scrolling, more interesting pages keep being linked and more new tabs keep being opened. Before you notice, there are 10+ tabs opened and you don't know which ones to check first so you close most of them.

This extension aims to correct that. Whenever the user tries to open more than a certain number of tabs, the newly opened tab is automatically closed. To open the new tab, you need to close another one, which forces the user to decide which tabs are worth keeping open.


## Usage

Go to [Firefox Addon Page](https://addons.mozilla.org/en-US/firefox/addon/tab-limiter-extension/) and install the extension.

You only need to have the extension activated for it to work. By default, the max number of open tabs allowed is 5, but you can change that number in the Options page.


## Contributing

To compile the files:

`npm run build`

To run the browser with the extension:

`npm run browser`

To watch the files and run the browser with the extension:

`npm run dev`


## Roadmap

- Make the options page have the style of the user's theme
- Add support for languages other than English
- Allow the extension to be installed in Android devices
- Add an icon on the toolbar to quickly check information


## Credits

- **Icon:** [Tabler Icons](https://github.com/tabler/tabler-icons), [MIT License](https://github.com/tabler/tabler-icons/blob/master/LICENSE)

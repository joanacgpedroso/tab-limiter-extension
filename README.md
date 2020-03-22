# Tab Limiter Extension

Tab Limiter is a Firefox extension that limits the number of tabs that can be open in a session, boosting your productivity.

## Motivation

How many times have you been browsing the web when you find a link you're curious about? Instead of going to another page to read it, you open a new tab and continue on the same page. As you keep scrolling, more interesting pages keep being linked and more new tabs keep being opened. Before you noticed, there are 10+ tabs opened and you don't know which ones to check first so you close most of them.

This extension aims to correct that. Whenever the user tries to open more than a certain number of tabs, the newly opened tab is automatically closed. To open it, you need to close another tab, which forces the user to decide which tabs are worth keeping open.

## Installation

Go to [Firefox Addon Page](https://addons.mozilla.org/en-US/firefox/addon/tab-limiter-extension/) and install the extension.

## Build

1. `npm install`
2. `npm run dev`

## Usage

You only need to have the extension activated for it to work. By default, the max number of open tabs allowed is 5 but you can change that number in the Options page.
#Text Tools
[![Code Climate](https://codeclimate.com/github/nicolasmccurdy/text_tools.png)](https://codeclimate.com/github/nicolasmccurdy/text_tools)

##New HTML System
In the new HTML layout system, Text Tools will aim to have much less bloated code. The HTML code will have far less redundant data, leaving the work of those properties to new JavaScript functions. CSS will stay mostly the same, unless some minor tweaks are needed. The system will have to be robust in letting elements that are not in the effects class handle external click creation, focus regaining, and other important UI tasks.

###Old HTML
- '''<a href="javascript:toEffect('normal')" title="Outputs the original, unedited text." onFocus="regainFocus()" onClick="clicked(this)"><img src="icons/text.png"> Normal</a>'''

###New HTML
- '''<a id="normal" class="effect"><img src="icons/text.png"> Normal</a>'''

###New JavaScript
- when specific effect link clicked: switch to the effect named in the link's id
- when specific effect link hovered: show the link's help tooltip, which is stored in a data structure (if help mode is enabled)
- when any effect link clicked: run clicked(this) for the clicked item
- when any effect link focused: run regainFOcus()

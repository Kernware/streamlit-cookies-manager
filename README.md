## Modifications from Kernware

- added reset feature, overwrites cookies values with empty string and set's the expiry date to 1970, expired cookies get delete by the browser (most of them)


# Streamlit Cookies Manager

Access and change browser cookies from Streamlit scripts:

```python
import os
import streamlit as st
from streamlit_cookies_manager import EncryptedCookieManager

# This should be on top of your script
cookies = EncryptedCookieManager(
    # This prefix will get added to all your cookie names.
    # This way you can run your app on Streamlit Cloud without cookie name clashes with other apps.
    prefix="ktosiek/streamlit-cookies-manager/",
    # You should really setup a long COOKIES_PASSWORD secret if you're running on Streamlit Cloud.
    password=os.environ.get("COOKIES_PASSWORD", "My secret password"),
)
if not cookies.ready():
    # Wait for the component to load and send us current cookies.
    st.stop()

st.write("Current cookies:", cookies)
value = st.text_input("New value for a cookie")
if st.button("Change the cookie"):
    cookies['a-cookie'] = value  # This will get saved on next rerun
    if st.button("No really, change it now"):
        cookies.save()  # Force saving the cookies now, without a rerun
```


## Release Process

Build package:
```
npm --prefix ./streamlit_cookies_manager/ run build
```

Create new branch with version
```
git checkout -b "v<version>"
```

Force add build folder and push
```
git add -f chat_input_advanced/frontend/build/
git commit -m "Release v<version>"
git push --set-upstream origin v<version>
```

And then create a new release on github, create a new tag with `release_v<version>`


import random
import string
import streamlit as st

from streamlit_cookies_manager import CookieManager

# Usage of CookieManager from Kernware
# Do not use cookies without a session_state, cookies might not get deleted, as
# backup if not a full page refresh is done the session state will handle the
# UI state

# Set up cookies
cookies = CookieManager(prefix="datachat_")
if not cookies.ready():
    print("COOKIES not ready")
    st.stop()


def initialize_session_state():
    if "user_id" not in st.session_state:
        print("Setting user_id from cookie")
        st.session_state.user_id = cookies.get("user_id")
    if "username" not in st.session_state:
        print("Setting username from cookie")
        st.session_state.username = cookies.get("username")
 
    print(f"States: {st.session_state.user_id}, {st.session_state.username}")
    st.write(f"States: {st.session_state.user_id}, {st.session_state.username}")


def cookie_set():
    user_id = str(random.randint(1, 1000))
    username = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    cookies['user_id'] = user_id
    cookies['username'] = username

    st.session_state.user_id = user_id
    st.session_state.username = username

    cookies.save()


def cookie_reset():
    cookies.reset()

    st.session_state.user_id = None
    st.session_state.username = None


def main():
    initialize_session_state()
    st.button("Set Cookies", on_click=cookie_set)
    st.button("Clear Cookies", on_click=cookie_reset)


if __name__ == "__main__":
    main()

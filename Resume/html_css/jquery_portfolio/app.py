import streamlit as st

# Title of the app
st.title("Welcome to My Streamlit App")

# User input for name
name = st.text_input("Enter your name:")

if name:
    st.write(f"Hello, {name}! Welcome to this Streamlit app.")

# A simple slider to select a number
number = st.slider("Select a number", 1, 100, 25)  # Min, Max, Default

# Display the square of the selected number
st.write(f"The square of {number} is {number ** 2}.")

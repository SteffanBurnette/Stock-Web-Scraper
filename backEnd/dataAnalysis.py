import pandas as pd #dataframe libary
import numpy as np  #statistical libary 
import matplotlib.pyplot as plt #Graphing libary
import seaborn as sns #Style for graph
sns.set_style('whitegrid')
plt.style.use("fivethirtyeight")

# For reading stock data from yahoo
from pandas_datareader.data import DataReader
import yfinance as yf #yahoo finance libary 
from pandas_datareader import data as pdr

# For time stamps
from datetime import datetime #Real time format libary 

yf.pdr_override()

# The tech stocks we'll use for this analysis
tech_list = ['AAPL', 'GOOG', 'MSFT', 'AMZN']

end = datetime.now()
start = datetime(end.year - 1, end.month, end.day)

# Create a dictionary to store the stock data
stock_data = {}

# The code snippet you provided is a loop that downloads stock data for each company in the
# tech_list and stores that data in the stock_data dictionary. 
for stock in tech_list:
    stock_data[stock] = yf.download(stock, start, end)

# Add company_name column to each DataFrame
company_name = ["APPLE", "GOOGLE", "MICROSOFT", "AMAZON"]

for stock, com_name in zip(stock_data.values(), company_name):
    stock["company_name"] = com_name

# Concatenate the data into a single DataFrame
df = pd.concat(stock_data.values(), keys=stock_data.keys())

# Display the last 10 rows of the concatenated DataFrame
print(df.tail(10))

# Convert DataFrame to JSON string
json_data = df.to_json()

# Write JSON string to a file
with open('stock_data.json', 'w') as json_file:
    json_file.write(json_data)

# Summary Stats
# Generate summary statistics for the 'AAPL' column
summary = stock_data['AAPL'].describe()
print(summary)

print("This should be info on the google stock: ")
#print(stock_data['GOOG'])

#Gives us all the info related to the selected ticker
google=yf.Ticker('GOOG')
print(google.history(period="5d"))


# Get a list of all available stock tickers
all_tickers = yf.tickers

print(all_tickers)


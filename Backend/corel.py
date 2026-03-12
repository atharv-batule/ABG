import pandas as pd

data = pd.read_csv("./Solar Power Plant Data.csv")

data['Date-Hour(NMT)'] = pd.to_datetime(
    data['Date-Hour(NMT)'],
    format='%d.%m.%Y-%H:%M'
)

data['hour'] = data['Date-Hour(NMT)'].dt.hour
data['month'] = data['Date-Hour(NMT)'].dt.month

# drop datetime
data = data.drop(columns=['Date-Hour(NMT)'])

# correlation matrix
corr_matrix = data.corr()

print(corr_matrix['SystemProduction'].sort_values(ascending=False))
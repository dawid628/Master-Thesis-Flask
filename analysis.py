import json
import pandas as pd
import matplotlib.pyplot as plt

# Wczytaj dane z pliku JSON
with open('result.json') as f:
    data = json.load(f)

# Funkcja do przetwarzania metryk
def process_metrics(metrics, metric_name):
    processed_data = []
    for stat_name, stat_value in metrics[metric_name]['values'].items():
        processed_data.append({
            'statystyka': stat_name,
            'wartość': stat_value
        })
    return pd.DataFrame(processed_data)

# Przetwarzanie danych na DataFrame
assets_df = process_metrics(data['metrics'], 'czas_trwania_assets')
new_data_df = process_metrics(data['metrics'], 'czas_trwania_new_data')
users_list_df = process_metrics(data['metrics'], 'czas_trwania_users_list')
new_user_df = process_metrics(data['metrics'], 'czas_trwania_new_user')
hospitals_list_df = process_metrics(data['metrics'], 'czas_trwania_hospitals_list')
new_hospital_df = process_metrics(data['metrics'], 'czas_trwania_new_hospital')
roles_list_df = process_metrics(data['metrics'], 'czas_trwania_roles_list')
new_role_df = process_metrics(data['metrics'], 'czas_trwania_new_role')
data_history_df = process_metrics(data['metrics'], 'czas_trwania_data_history')

# Generowanie wykresów
plt.figure(figsize=(15, 20))

# plt.subplot(4, 3, 1)
# plt.plot(assets_df['statystyka'], assets_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla pobrania danych')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(new_data_df['statystyka'], new_data_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla utworzenia danych')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(users_list_df['statystyka'], users_list_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla pobrania użytkowników')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(new_user_df['statystyka'], new_user_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla utworzenia użytkownika')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(hospitals_list_df['statystyka'], hospitals_list_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla pobrania szpitali')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(new_hospital_df['statystyka'], new_hospital_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla utworzenia szpitala')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(roles_list_df['statystyka'], roles_list_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla pobrania ról')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(new_role_df['statystyka'], new_role_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla utworzenia roli')
# plt.legend()
# plt.grid(True)

# plt.subplot(4, 3, 2)
# plt.plot(data_history_df['statystyka'], data_history_df['wartość'], label='Czas trwania')
# plt.xlabel('Statystyka')
# plt.ylabel('Czas (ms)')
# plt.title('Czas trwania zapytań dla historii danych')
# plt.legend()
# plt.grid(True)

plt.tight_layout()
plt.show()

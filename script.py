import pandas as pd
import numpy as np
import sys

def edit_csv(input_file, output_file, rows, cols, fill_value="AG"):
    # Wczytanie pliku CSV
    df = pd.read_csv(input_file)
    
    # Zmiana liczby kolumn
    if df.shape[1] < cols:
        last_column = df.columns[-1]
        for i in range(cols - df.shape[1]):
            df[f'{last_column}_{i+1}'] = fill_value
    
    # Zmiana liczby wierszy
    if df.shape[0] < rows:
        last_row = df.iloc[-1].copy()
        for col in df.columns:
            last_row[col] = fill_value
        for i in range(rows - df.shape[0]):
            df = df.append(last_row, ignore_index=True)
    
    # Zapisanie edytowanego pliku CSV
    df.to_csv(output_file, index=False)
    print(f"Plik został zapisany jako {output_file}")

# Funkcja główna
def main(input_file, output_file, rows, cols):
    edit_csv(input_file, output_file, rows, cols)

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Użycie: python script.py input_file output_file rows cols")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        rows = int(sys.argv[3])
        cols = int(sys.argv[4])
        main(input_file, output_file, rows, cols)

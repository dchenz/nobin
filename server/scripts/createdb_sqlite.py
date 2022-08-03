import argparse
import os
import sqlite3

parser = argparse.ArgumentParser()
parser.add_argument("path")
parser.add_argument("--replace", action="store_true")
args = parser.parse_args()

SQLITE_PATH = args.path

if os.path.exists(SQLITE_PATH):
    if os.path.isfile(SQLITE_PATH) and args.replace:
        os.remove(SQLITE_PATH)
    else:
        print(f"Something already exists at {SQLITE_PATH}")
        exit(1)

with open("scripts/schema.sql") as f:
    sqlscript = f.read()

conn = None
try:
    conn = sqlite3.connect(SQLITE_PATH)
    conn.executescript(sqlscript)
    conn.commit()
finally:
    if conn:
        conn.close()

from flask import Flask, Blueprint, request
from utils import send_query
import json

#Show all subjects for a given tutor by their email
def show_subjects(email):
    """Returns a list of subjects that a tutor teaches from their email address"""
    # Get the tutor's id from their email address 
    query = f"SELECT tutorid FROM Tutors WHERE email = '{email}';" 
    tutor_id = send_query(query)
    # Get the subjects that the tutor teaches 
    query = f"SELECT coursecode FROM SubjectsRelationship WHERE tutorid = {tutor_id[0][0]};" 
    subject_ids = send_query(query) 
    return json.dumps(subject_ids[0][0]).replace('"', '')
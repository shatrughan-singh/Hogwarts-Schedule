Feature: Schedule Today - Attendance and Teacher Assignment

  As a user,
  I want to manage teacher attendance and ensure that the correct teacher is assigned to each student,
  So that the students have an appropriate teacher assigned for their classes.

  # Scenario 1: Initial Schedule with all teachers present
  Scenario: All teachers are present
    Given the following teachers are present:
      | Teacher               | Attendance |
      | Professor Dumbledore   | Present    |
      | Minerva McGonagall     | Present    |
      | Rubeus Hagrid          | Present    |
      | Horace Slughorn        | Present    |
      | Severus Snape          | Present    |
    And the following students have their teacher allocations:
      | Student          | Subject        | Allocated Teacher   |
      | Harry Potter     | Potions Master | Horace Slughorn     |
      | Hermione Granger | Potions Master | Horace Slughorn     |
      | Ron Weasley      | Potions Master | Severus Snape       |
      | Draco Malfoy     | Potions Master | Horace Slughorn     |
      | Padma Patil      | Potions Master | Rubeus Hagrid       |
      | Luna Lovegood    | Potions Master | Severus Snape       |
    When I view the "Current Schedule"
    Then "Hermione Granger" should be assigned to "Rubeus Hagrid"
    And "Padma Patil" should be assigned to "Rubeus Hagrid"

  # Scenario 2: Teacher is absent, fallback teacher is assigned
  Scenario: Horace Slughorn is absent
    Given the following teachers are present:
      | Teacher               | Attendance |
      | Professor Dumbledore   | Present    |
      | Minerva McGonagall     | Present    |
      | Rubeus Hagrid          | Present    |
      | Horace Slughorn        | Absent     |
      | Severus Snape          | Present    |
    And the following students have their teacher allocations:
      | Student          | Subject        | Allocated Teacher   |
      | Harry Potter     | Potions Master | Horace Slughorn     |
      | Hermione Granger | Potions Master | Horace Slughorn     |
      | Ron Weasley      | Potions Master | Severus Snape       |
      | Draco Malfoy     | Potions Master | Horace Slughorn     |
      | Padma Patil      | Potions Master | Rubeus Hagrid       |
      | Luna Lovegood    | Potions Master | Severus Snape       |
    When I view the "Current Schedule"
    Then I should see the following teacher assignments:
      | Student          | Subject        | Teacher            |
      | Harry Potter     | Potions Master | Rubeus Hagrid      |
      | Hermione Granger | Potions Master | Rubeus Hagrid      |
      | Ron Weasley      | Potions Master | Severus Snape      |
      | Draco Malfoy     | Potions Master | Rubeus Hagrid      |
      | Padma Patil      | Potions Master | Rubeus Hagrid      |
      | Luna Lovegood    | Potions Master | Severus Snape      |

  # Scenario 3: Multiple teachers are absent, fallback is assigned correctly
  Scenario: Horace Slughorn and Rubeus Hagrid are absent
    Given the following teachers are present:
      | Teacher               | Attendance |
      | Professor Dumbledore   | Present    |
      | Minerva McGonagall     | Present    |
      | Rubeus Hagrid          | Absent     |
      | Horace Slughorn        | Absent     |
      | Severus Snape          | Present    |
    And the following students have their teacher allocations:
      | Student          | Subject        | Allocated Teacher   |
      | Harry Potter     | Potions Master | Horace Slughorn     |
      | Hermione Granger | Potions Master | Horace Slughorn     |
      | Ron Weasley      | Potions Master | Severus Snape       |
      | Draco Malfoy     | Potions Master | Horace Slughorn     |
      | Padma Patil      | Potions Master | Rubeus Hagrid       |
      | Luna Lovegood    | Potions Master | Severus Snape       |
    When I view the "Current Schedule"
    Then I should see the following teacher assignments:
      | Student          | Subject        | Teacher            |
      | Harry Potter     | Potions Master | Minerva McGonagall |
      | Hermione Granger | Potions Master | Minerva McGonagall |
      | Ron Weasley      | Potions Master | Severus Snape      |
      | Draco Malfoy     | Potions Master | Minerva McGonagall |
      | Padma Patil      | Potions Master | Minerva McGonagall |
      | Luna Lovegood    | Potions Master | Severus Snape      |

  # Scenario 4: All teachers are absent, "Not Assigned" is shown
  Scenario: All teachers are absent
    Given the following teachers are present:
      | Teacher               | Attendance |
      | Professor Dumbledore   | Absent     |
      | Minerva McGonagall     | Absent     |
      | Rubeus Hagrid          | Absent     |
      | Horace Slughorn        | Absent     |
      | Severus Snape          | Absent     |
    And the following students have their teacher allocations:
      | Student          | Subject        | Allocated Teacher   |
      | Harry Potter     | Potions Master | Horace Slughorn     |
      | Hermione Granger | Potions Master | Horace Slughorn     |
      | Ron Weasley      | Potions Master | Severus Snape       |
      | Draco Malfoy     | Potions Master | Horace Slughorn     |
      | Padma Patil      | Potions Master | Rubeus Hagrid       |
      | Luna Lovegood    | Potions Master | Severus Snape       |
    When I view the "Current Schedule"
    Then I should see the following teacher assignments:
      | Student          | Subject        | Teacher        |
      | Harry Potter     | Potions Master | Not Assigned   |
      | Hermione Granger | Potions Master | Not Assigned   |
      | Ron Weasley      | Potions Master | Not Assigned   |
      | Draco Malfoy     | Potions Master | Not Assigned   |
      | Padma Patil      | Potions Master | Not Assigned   |
      | Luna Lovegood    | Potions Master | Not Assigned   |

  # Scenario 5: Updating teacher attendance dynamically updates the schedule
  Scenario: Update teacher attendance and dynamically update the schedule
    Given the following teachers are present:
      | Teacher               | Attendance |
      | Professor Dumbledore   | Present    |
      | Minerva McGonagall     | Present    |
      | Rubeus Hagrid          | Present    |
      | Horace Slughorn        | Present    |
      | Severus Snape          | Present    |
    And the following students have their teacher allocations:
      | Student          | Subject        | Allocated Teacher   |
      | Harry Potter     | Potions Master | Horace Slughorn     |
      | Hermione Granger | Potions Master | Horace Slughorn     |
      | Ron Weasley      | Potions Master | Severus Snape       |
      | Draco Malfoy     | Potions Master | Horace Slughorn     |
      | Padma Patil      | Potions Master | Rubeus Hagrid       |
      | Luna Lovegood    | Potions Master | Severus Snape       |
    When I change "Horace Slughorn" attendance to "Absent"
    Then I should see the following updated teacher assignments:
      | Student          | Subject        | Teacher            |
      | Harry Potter     | Potions Master | Rubeus Hagrid      |
      | Hermione Granger | Potions Master | Rubeus Hagrid      |
      | Ron Weasley      | Potions Master | Severus Snape      |
      | Draco Malfoy     | Potions Master | Rubeus Hagrid      |
      | Padma Patil      | Potions Master | Rubeus Hagrid      |
      | Luna Lovegood    | Potions Master | Severus Snape      |

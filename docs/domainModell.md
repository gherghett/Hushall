Collections
Households[]
    - householdId
    - name
    - code
    - members[]
        - userId
        - memberId
        - name
        - characterId

    - chores[]
        - name 
        - desc
        - interval ?
        - weight
        - completions[]
            - completedBy (MEMBERid)
            - completedAt

Collection
Users []
    - userId
    - householdsId[]

households/
  {hid}/
    chores/
      {cid}/
        comps/              // completions
          {compId} {
            memId, userId, createdAt
          }
        name, desc, interval, wait
    members/
      {uid}/
        m-id, profile, role?
    name, desc, comps: [...]
users/
  {uid}/
    households: ["hid1","hid2",...]
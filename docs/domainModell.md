Collections
Households[]
  - Id: string;
  - name: string;
  - code: string;
  - applications [member*]
  - members[]
    - Id
    - userId ?
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
completions[]

Collection
Users []
  - Id
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

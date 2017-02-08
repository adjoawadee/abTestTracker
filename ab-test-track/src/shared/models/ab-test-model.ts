export interface ABTest{
  _id: string;
  description: {
    long: string,
    short: string
  };
  details:{
    active: boolean,
    from: Date,
    to: Date
  };
  mission: string;
  name: string;
  owner:{
    first: string,
    last:string
  };
  snapshots: Snapshots[];
  tags:Tags[],
  prototype: Object
}

export interface Snapshots{
  snapshot_description: string,
  snapshot_title: string,
  snapshot_url: string
}

export interface Tags{
     tags: string
}


import Profile from '../models/profile';

export default function () {
  Profile.count().exec((err, count) => {
    if (err) {
      console.log('athena DB: Error getting mock profile count: ');
      console.log(error);
    }
    if (count > 0) {
      console.log(`athena DB: ${count} mock profiles exist.`);
      return;
    }

    const profile1 = new Profile(
      { 
        age: '35',
        dateAdded: new Date(),
        location: 'Charlotte',
        skill: 'Javascript',
        username: 'sir_coop',
      }
    );

    const profile2 = new Profile(
      { 
        age: '32',
        dateAdded: new Date(),
        location: 'Charlotte',
        skill: 'Product Design',
        username: 'date_mike',
      }
    );

    const profiles = [
      profile1,
      profile2,
    ];

    Profile.create(profiles, (error) => {
      if (!error) {
        console.log(`athena DB: ${profiles.length} mock profiles created.`);
      } else {
        console.log('athena DB: Error creating mock profiles: ');
        console.log(error);
      }
    });
  });
}

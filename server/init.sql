CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS puppies
(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    sex TEXT,
    birthday DATE NOT NULL
);
INSERT INTO puppies (id, name, birthday, sex, email) VALUES ('3c53fbf1-7c12-4f1a-ae8e-1da66945165b', 'Soomsoom', '2023-01-18', 'Female', 'test@test.com');
INSERT INTO puppies (id, name, birthday, sex, email) VALUES ('9ec6a7a8-d33a-455f-89bb-dfc866366a24', 'June', '2023-02-18', 'Female', 'test2@test.com');


CREATE TABLE IF NOT EXISTS parties
(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pup_id UUID NOT NULL,
    location VARCHAR(30), 
    time_started TIMESTAMP NOT NULL,
    ended BOOLEAN DEFAULT FALSE,
    CONSTRAINT fkPupId FOREIGN KEY (pup_id) REFERENCES puppies(id)
);
INSERT INTO parties (id, pup_id, location, time_started, ended ) VALUES ('a7d68e32-46f6-40af-8b98-89b686b5f9f3', '3c53fbf1-7c12-4f1a-ae8e-1da66945165b', '@41.8918285,-87.6164283',  '2023-12-09 at 12:45pm est', false);


CREATE TABLE IF NOT EXISTS requests
(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    requester_id UUID NOT NULL,
    requestee_id UUID NOT NULL,
    status VARCHAR(8),
    CONSTRAINT fkrequestedPupId FOREIGN KEY (requester_id) REFERENCES puppies(id),
    CONSTRAINT fkrequesteePupId FOREIGN KEY (requestee_id) REFERENCES puppies(id)
    
);
INSERT INTO requests (id, requester_id, requestee_id, status ) VALUES ('8ec0c9f4-c462-41df-8967-127691997a6e', '3c53fbf1-7c12-4f1a-ae8e-1da66945165b', '9ec6a7a8-d33a-455f-89bb-dfc866366a24','Pending');


CREATE TABLE IF NOT EXISTS notifications
(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pup_id UUID NOT NULL,
    type_of_request VARCHAR(6), 
    friend_request_id UUID,
    party_request_id UUID,
    time_created TIMESTAMP NOT NULL,
    CONSTRAINT fkPupId FOREIGN KEY (pup_id) REFERENCES puppies(id),
    CONSTRAINT fkFriendRequestId FOREIGN KEY (friend_request_id) REFERENCES requests(id),
    CONSTRAINT fkPartyRequestId FOREIGN KEY (party_request_id) REFERENCES parties(id)
        
);
INSERT INTO notifications (id, pup_id, type_of_request, friend_request_id, time_created ) VALUES ('5ba7b9f7-fe12-4d13-8e71-6af3423df48c', '3c53fbf1-7c12-4f1a-ae8e-1da66945165b', 'Friend', '8ec0c9f4-c462-41df-8967-127691997a6e','2023-11-28T12:35:00Z');
INSERT INTO notifications (id, pup_id, type_of_request, party_request_id, time_created ) VALUES ('9f33f3a5-ffd5-494f-a8d8-e5c98d81e7b7', '3c53fbf1-7c12-4f1a-ae8e-1da66945165b', 'Party', 'a7d68e32-46f6-40af-8b98-89b686b5f9f3', '2023-11-28T12:45:00Z');


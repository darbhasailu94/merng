import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import React from 'react'
import { Image, Item } from 'semantic-ui-react'

const PostBook = () => (
    <Item>
      <Item.Image size='tiny' src="https://react.semantic-ui.com/images/avatar/large/molly.png" />

      <Item.Content>
        <Item.Header>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
)

export default PostBook

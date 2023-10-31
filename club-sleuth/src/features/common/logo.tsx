import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import LogoWhite from '../../assets/png/logo-white.png';
import { Link } from 'react-router-dom';

const Logo = (props: any) => {
  return (
    <Box {...props}>
      <Link to={'/'}>
        <Image src={LogoWhite} boxSize={'100px'} alt='Logo'></Image>
      </Link>
    </Box>
  );
};

export default Logo;

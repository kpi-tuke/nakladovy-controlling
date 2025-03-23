"use client";

import Releases from "@/components/Releases";
import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";

type ItemProps = {
  img: string;
  name: string;
  url: string;
};

const Item: React.FC<ItemProps> = ({ img, name, url }) => {
  const theme = useTheme();

  return (
    <Link href={url} style={{ textDecoration: "none" }}>
      <Box
        sx={[
          {
            width: 240,
            height: 240,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            textTransform: "none",
            color: "text.primary",
            bgcolor: "action.selected",
            borderRadius: 2,
            padding: 3,

            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        ]}
      >
        <Box
          sx={{
            img: {
              width: 140,
              height: 140,
            },
          }}
        >
          <img src={img} alt="windows" width={240} height={240} />
        </Box>

        <Typography variant="h6">{name}</Typography>
      </Box>
    </Link>
  );
};

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
  }),
}));

type Props = {
  metadata: {
    tag: string;
    windowsUrl: string;
    linuxUrl: string;
  }[];
};

const DownloadPageClient: React.FC<Props> = ({ metadata }) => {
  const [latestRelease, ...olderReleases] = metadata;

  return (
    <StyledStack
      sx={{
        minHeight: "100vh",
        pt: {
          xs: 16,
          md: 20,
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: {
            xs: 32,
            sm: 40,
            md: 54,
          },
          pb: {
            xs: 4,
            sm: 6,
            md: 0,
          },
        }}
      >
        Dostupné verzie na stiahnutie
      </Typography>

      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          height: {
            md: "50vh",
          },
        }}
      >
        {latestRelease?.windowsUrl && (
          <Item
            img={"/windows.png"}
            name="Windows"
            url={latestRelease.windowsUrl}
          />
        )}
        {latestRelease?.linuxUrl && (
          <Item img="/linux.png" name="Linux" url={latestRelease.linuxUrl} />
        )}
      </Box>

      {olderReleases?.length && <Releases releases={olderReleases} />}
    </StyledStack>
  );
};

export default DownloadPageClient;

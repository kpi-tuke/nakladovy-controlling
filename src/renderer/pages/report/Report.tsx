import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { RouteName } from 'renderer/routes';

const Wrapper = styled(Box)`
  position: relative;
  padding-right: 0;

  .hideInScreen,
  .page-print-title,
  .spacer {
    display: block !important;
    visibility: visible !important;
  }

  .hideInPrint {
    display: none;
    visibility: hidden;
  }

  @media print {
    .spacer.hideInPrint {
      display: none !important;
      visibility: hidden !important;
    }
  }
`;

const TimelineWrapper = styled(Box)`
  position: fixed;
  right: 0;
  top: 80px;

  @media print {
    display: none;
  }
`;

type Props = {
  EconomicAnalysisPage: () => React.ReactElement;
  StructureAnalysisPage: () => React.ReactElement;
  IndexAnalysisPage: () => React.ReactElement;
  CVPAnalysisPage: () => React.ReactElement;
  SortimentAnalysisPage: () => React.ReactElement;
  ParetoAnalysisPage: () => React.ReactElement;
};

const Report: React.FC<Props> = ({
  EconomicAnalysisPage,
  StructureAnalysisPage,
  IndexAnalysisPage,
  CVPAnalysisPage,
  SortimentAnalysisPage,
  ParetoAnalysisPage,
}) => {
  const economicRef = React.useRef(null);
  const structureRef = React.useRef(null);
  const indexRef = React.useRef(null);
  const cvpRef = React.useRef(null);
  const paretoRef = React.useRef(null);
  const sortimentRef = React.useRef(null);

  console.log('sortimentRef: ', sortimentRef);

  return (
    <Wrapper
      sx={{
        paddingRight: {
          md: 28,
        },
      }}
    >
      <div ref={economicRef}></div>
      <EconomicAnalysisPage />
      <div className="new-page" ref={structureRef}></div>
      <StructureAnalysisPage />
      <div className="new-page" ref={indexRef}></div>
      <IndexAnalysisPage />
      <div className="new-page" ref={cvpRef}></div>
      <CVPAnalysisPage />
      <div className="new-page" ref={sortimentRef}></div>
      <SortimentAnalysisPage />
      <div className="new-page" ref={paretoRef}></div>
      <ParetoAnalysisPage />

      <TimelineWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <TimelineComponent
          items={[
            {
              label: 'Ekonomická analýza hospodárenia',
              id: RouteName.ECONOMIC_ANALYSIS,
              ref: economicRef,
            },
            {
              label: 'Štruktúrna analýza',
              id: RouteName.STRUCTURE_ANALYSIS,
              ref: structureRef,
            },
            {
              label: 'Indexná analýza',
              id: RouteName.INDEX_ANALYSIS,
              ref: indexRef,
            },
            {
              label: 'CVP analýza',
              id: RouteName.CVP_ANALYSIS,
              ref: cvpRef,
            },
            {
              label: 'Sortimentná analýza',
              id: RouteName.SORTIMENT_ANALYSIS,
              ref: sortimentRef,
            },
            {
              label: 'Pareto analýza',
              id: RouteName.PERETO_ANALYSIS,
              ref: paretoRef,
            },
          ]}
        />
      </TimelineWrapper>
    </Wrapper>
  );
};

export default Report;

const TimelineContentStyled = styled(TimelineContent)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const TimelineComponent: React.FC<{
  items: { label: string; id: string; ref: any }[];
}> = ({ items }) => {
  return (
    <Timeline>
      {items.map((item, index) => (
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            {index < items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContentStyled
            onClick={() => {
              item.ref.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {item.label}
          </TimelineContentStyled>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

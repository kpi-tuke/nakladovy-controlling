import React, { useRef } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { RouteName } from '@renderer/routes';
import {
  ColorMode,
  useTheme,
} from '@renderer/components/providers/ThemeProvider';
import { useAppSelector } from '@renderer/store/hooks';
import { hasEconomicChanged } from '../economic/economicSlice';
import { hasStructureChanged } from '../structure/structureSlice';
import { hasCvpChanged } from '../cvp/cvpSlice';
import { hasSortimentChanged } from '../sortiment/sortimentSlice';
import { hasIndexChanged } from '../index/indexSlice';
import { hasParetoChanged } from '../pareto/paretoSlice';
import { hasTrendChanged } from '../trend/trendSlice';
import { hasVariationChanged } from '../variation/variationSlice';

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

const Center = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => theme.pageHeader.height + 20}px;
`;

const Text = styled(Typography)`
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

type Props = {
  EconomicAnalysisPage: () => React.ReactElement;
  StructureAnalysisPage: () => React.ReactElement;
  IndexAnalysisPage: () => React.ReactElement;
  CVPAnalysisPage: () => React.ReactElement;
  SortimentAnalysisPage: () => React.ReactElement;
  ParetoAnalysisPage: () => React.ReactElement;
  TrendAnalysisPage: () => React.ReactElement;
  VariationAnalysisPage: () => React.ReactElement;
};

const Report: React.FC<Props> = ({
  EconomicAnalysisPage,
  StructureAnalysisPage,
  IndexAnalysisPage,
  CVPAnalysisPage,
  SortimentAnalysisPage,
  ParetoAnalysisPage,
  TrendAnalysisPage,
  VariationAnalysisPage,
}) => {
  const { setMode, mode } = useTheme();

  const economicRef = React.useRef(null);
  const structureRef = React.useRef(null);
  const indexRef = React.useRef(null);
  const cvpRef = React.useRef(null);
  const paretoRef = React.useRef(null);
  const sortimentRef = React.useRef(null);
  const trendRef = React.useRef(null);
  const variationRef = React.useRef(null);

  const hasEconomicChange = useAppSelector(hasEconomicChanged);
  const hasStructureChange = useAppSelector(hasStructureChanged);
  const hasCvpChange = useAppSelector(hasCvpChanged);
  const hasSortimentChange = useAppSelector(hasSortimentChanged);
  const hasIndexChange = useAppSelector(hasIndexChanged);
  const hasParetoChange = useAppSelector(hasParetoChanged);
  const hasTrendChange = useAppSelector(hasTrendChanged);
  const hasVariationChange = useAppSelector(hasVariationChanged);

  const hasAnyAnalysisChange =
    !hasEconomicChange &&
    !hasStructureChange &&
    !hasCvpChange &&
    !hasSortimentChange &&
    !hasIndexChange &&
    !hasParetoChange &&
    !hasTrendChange &&
    !hasVariationChange;

  const prevMode = useRef<ColorMode>();

  React.useEffect(() => {
    if (mode === 'dark') {
      prevMode.current = 'dark';
    }

    setMode('light');

    return () => {
      if (prevMode.current) {
        setMode(prevMode.current);
      }
    };
  }, [mode, setMode]);

  return (
    <Wrapper
      sx={{
        paddingRight: {
          md: 28,
        },
      }}
    >
      {hasEconomicChange && (
        <div ref={economicRef}>
          <EconomicAnalysisPage />
        </div>
      )}

      {hasStructureChange && (
        <div className="new-page" ref={structureRef}>
          <StructureAnalysisPage />
        </div>
      )}

      {hasIndexChange && (
        <div className="new-page" ref={indexRef}>
          <IndexAnalysisPage />
        </div>
      )}

      {hasCvpChange && (
        <div className="new-page" ref={cvpRef}>
          <CVPAnalysisPage />
        </div>
      )}

      {hasSortimentChange && (
        <div className="new-page" ref={sortimentRef}>
          <SortimentAnalysisPage />
        </div>
      )}

      {hasParetoChange && (
        <div className="new-page" ref={paretoRef}>
          <ParetoAnalysisPage />
        </div>
      )}

      {hasTrendChange && (
        <div className="new-page" ref={trendRef}>
          <TrendAnalysisPage />
        </div>
      )}

      {hasVariationChange && (
        <div className="new-page" ref={variationRef}>
          <VariationAnalysisPage />
        </div>
      )}

      {hasAnyAnalysisChange && (
        <Center>
          <Text>Žiadna analýza nebola zatiaľ zmenená</Text>
        </Center>
      )}

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
            ...(hasEconomicChange
              ? [
                  {
                    label: 'Ekonomická analýza hospodárenia',
                    id: RouteName.ECONOMIC_ANALYSIS,
                    ref: economicRef,
                  },
                ]
              : []),
            ...(hasStructureChange
              ? [
                  {
                    label: 'Štruktúrna analýza nákladov',
                    id: RouteName.STRUCTURE_ANALYSIS,
                    ref: structureRef,
                  },
                ]
              : []),
            ...(hasIndexChange
              ? [
                  {
                    label: 'Indexná analýza nákladov',
                    id: RouteName.INDEX_ANALYSIS,
                    ref: indexRef,
                  },
                ]
              : []),
            ...(hasCvpChange
              ? [
                  {
                    label: 'CVP analýza',
                    id: RouteName.CVP_ANALYSIS,
                    ref: cvpRef,
                  },
                ]
              : []),
            ...(hasSortimentChange
              ? [
                  {
                    label: 'Sortimentná analýza',
                    id: RouteName.SORTIMENT_ANALYSIS,
                    ref: sortimentRef,
                  },
                ]
              : []),
            ...(hasParetoChange
              ? [
                  {
                    label: 'Pareto analýza nákladov',
                    id: RouteName.PERETO_ANALYSIS,
                    ref: paretoRef,
                  },
                ]
              : []),
            ...(hasTrendChange
              ? [
                  {
                    label: 'Trendová analýza nákladov',
                    id: RouteName.TREND_ANALYSIS,
                    ref: trendRef,
                  },
                ]
              : []),
            ...(hasVariationChange
              ? [
                  {
                    label: 'Odchýlková analýza nákladov',
                    id: RouteName.VARIATION_ANALYSIS,
                    ref: variationRef,
                  },
                ]
              : []),
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

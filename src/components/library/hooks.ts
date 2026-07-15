import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getInterests, getInterest, createInterest, updateInterest, deleteInterest,
  getShelf, updateRecommendationStatus, curate, respondToCurationStep,
} from '../../api/interests';
import type {
  Interest, TasteProfile, RecommendationStatus, ShelfFilters, CurationResult,
} from '../../types/interest';

export const libraryKeys = {
  all: ['interests'] as const,
  list: () => ['interests'] as const,
  detail: (id: string) => ['interests', id] as const,
  shelf: (id: string, filters: ShelfFilters) => ['interests', id, 'shelf', filters] as const,
};

export function useInterests(token: string | undefined) {
  return useQuery({ queryKey: libraryKeys.list(), queryFn: () => getInterests(token) });
}

export function useInterest(id: string, token: string | undefined) {
  return useQuery({
    queryKey: libraryKeys.detail(id),
    queryFn: () => getInterest(id, token),
    enabled: Boolean(id),
  });
}

export function useShelf(id: string, filters: ShelfFilters, token: string | undefined) {
  return useQuery({
    queryKey: libraryKeys.shelf(id, filters),
    queryFn: () => getShelf(id, filters, token),
    enabled: Boolean(id),
  });
}

export function useCreateInterest(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { intent: string; taste_profile?: TasteProfile }) =>
      createInterest(body, token),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: libraryKeys.list() }); },
  });
}

export function useUpdateInterest(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; body: { intent?: string; taste_profile?: TasteProfile } }) =>
      updateInterest(vars.id, vars.body, token),
    onSuccess: (updated: Interest) => {
      void qc.invalidateQueries({ queryKey: libraryKeys.detail(updated.id) });
      void qc.invalidateQueries({ queryKey: libraryKeys.list() });
    },
  });
}

export function useDeleteInterest(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInterest(id, token),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: libraryKeys.list() }); },
  });
}

export function useCurate(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; body?: { scrutiny?: 'quick' | 'standard' | 'rigorous'; shelf_size?: number } }): Promise<CurationResult> =>
      curate(vars.id, vars.body ?? {}, token),
    onSuccess: (_result, vars) => {
      void qc.invalidateQueries({ queryKey: libraryKeys.detail(vars.id) });
      void qc.invalidateQueries({ queryKey: ['interests', vars.id, 'shelf'] });
    },
  });
}

export function useRespondToStep(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { interestId: string; runId: string; stepRunId: string; answers: string[] }): Promise<CurationResult> =>
      respondToCurationStep(vars.interestId, vars.runId, vars.stepRunId, vars.answers, token),
    onSuccess: (_result, vars) => {
      void qc.invalidateQueries({ queryKey: libraryKeys.detail(vars.interestId) });
      void qc.invalidateQueries({ queryKey: ['interests', vars.interestId, 'shelf'] });
    },
  });
}

export function useUpdateRecStatus(interestId: string, token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { recId: string; status: RecommendationStatus }) =>
      updateRecommendationStatus(interestId, vars.recId, vars.status, token),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['interests', interestId, 'shelf'] }); },
  });
}
